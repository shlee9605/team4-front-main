/**
 * 목표 기기의 실시간 정보를 연결하는 파트입니다
 * 방식은 자유지만 본 프로젝트에서는 mqtt를 사용함
 */
import mqtt from 'mqtt'
import * as THREE from 'three'
import calculate from '../plugins/raycast'
import ThreeButtonHandler from '../plugins/raycaster'
import buttonhandler from '../plugins/buttonhandler'

class Event {
  constructor(element, renderer, scene) {
    ////config////
    const publish_topic = process.env.VUE_APP_PUBLISH_TOPIC
    const subscribe_topic = process.env.VUE_APP_SUBSCRIBE_TOPIC
    const port = process.env.VUE_APP_PORT2
    const host = process.env.VUE_APP_HOST2
    const path = process.env.VUE_APP_PATH2

    const raycast = new THREE.Raycaster()
    raycast.layers.set(1)
    const pointer = new THREE.Vector2()

    renderer.domElement.addEventListener('pointerdown', event => {
      const xy = calculate.ray(event, renderer)
      const x = xy.x
      const y = xy.y

      pointer.set(x, y)

      raycast.setFromCamera(pointer, scene.camera.cameraElement)
      const intersects = raycast.intersectObjects(scene.scene.children)

      if (intersects) {
        const intersect = intersects[0]
        const message = ThreeButtonHandler.Handling(intersect, scene)
        this.sendMQTT(publish_topic, { tagId: message.tagId, value: message.value })
      }
    })

    ////2D buttons////
    const eventElement = document.createElement('div')

    //connection check & reconnect
    const connectButton = eventElement.appendChild(document.createElement('button'))
    connectButton.innerText = 'Connect'
    connectButton.classList.add('btn', 'btn-primary')
    connectButton.style.position = 'relative'
    connectButton.style.right = '160%'
    connectButton.style.top = '20%'

    const statusElementt = eventElement.appendChild(document.createElement('pre'))
    statusElementt.innerText = '연결 상태 :'
    statusElementt.style.position = 'relative'
    statusElementt.style.right = '215%'
    statusElementt.style.top = '10%'

    const statusElement = eventElement.appendChild(document.createElement('span'))
    statusElement.innerText = '연결'
    statusElement.style.color = 'red'
    statusElement.style.position = 'relative'
    statusElement.style.right = '130%'
    statusElement.style.top = '3.9%'

    connectButton.addEventListener('click', () => {
      statusElement.style.color = 'red'
      buttonhandler.buttonConnect(startButton, stopButton, resetButton)
      if (this.client) this.client.end()
      this.receiveMQTT(host, port, path, subscribe_topic, statusElement.style, scene.resource.edukit)
    })

    //start button
    const startButton = eventElement.appendChild(document.createElement('button'))
    startButton.innerText = '시작'
    startButton.classList.add('btn', 'btn-success')
    startButton.style.position = 'relative'
    startButton.style.right = '230%'
    startButton.style.top = '18.5%'

    //stop button
    const stopButton = eventElement.appendChild(document.createElement('button'))
    stopButton.innerText = '정지'
    stopButton.classList.add('btn', 'btn-danger')
    stopButton.style.pointerEvents = 'none'
    stopButton.style.position = 'relative'
    stopButton.style.right = '130%'
    stopButton.style.top = '13.1%'

    //reset button
    const resetButton = eventElement.appendChild(document.createElement('button'))
    resetButton.innerText = '리셋'
    resetButton.classList.add('btn', 'btn-warning')
    resetButton.style.position = 'relative'
    resetButton.style.right = '60%'
    resetButton.style.top = '7.8%'

    const starStatus = eventElement.appendChild(document.createElement('pre'))
    starStatus.innerText = '시작 상태 :'
    starStatus.style.position = 'relative'
    starStatus.style.right = '200%'
    starStatus.style.top = '15%'

    const starStatus2 = eventElement.appendChild(document.createElement('pre'))
    starStatus2.innerText = "종료 되었습니다"
    starStatus2.style.position = 'relative'
    starStatus2.style.right = '110%'
    starStatus2.style.top = '9.8%'

    const dice = eventElement.appendChild(document.createElement('pre'))
    dice.innerText = '주사위 상태 :'
    dice.style.position = 'relative'
    dice.style.right = '200%'
    dice.style.top = '8%'

    const diceStatus = eventElement.appendChild(document.createElement('pre'))
    diceStatus.innerText = `6`
    diceStatus.style.color = ''
    diceStatus.style.position = 'relative'
    diceStatus.style.right = '100%'
    diceStatus.style.top = '3%'

    const basket = eventElement.appendChild(document.createElement('pre'))
    basket.innerText = '바구니 상태 :'
    basket.style.position = 'relative'
    basket.style.right = '200%'
    basket.style.top = '1%'

    const basketStatus = eventElement.appendChild(document.createElement('pre'))
    basketStatus.innerText = '빨간색'
    basketStatus.style.position = 'relative'
    basketStatus.style.right = '100%'
    basketStatus.style.top = '-4.2%'


    //event listener
    startButton.addEventListener('click', () => {
      buttonhandler.Start(startButton, stopButton, resetButton)
      this.sendMQTT(publish_topic, { tagId: '1', value: '1' })
    })
    stopButton.addEventListener('click', () => {
      buttonhandler.Stop(startButton, stopButton, resetButton)
      this.sendMQTT(publish_topic, { tagId: '1', value: '0' })
    })
    resetButton.addEventListener('click', () => {
      buttonhandler.Reset(startButton, stopButton, resetButton)
      this.sendMQTT(publish_topic, { tagId: '8', value: '0' })
    })

    //connect at start
    this.receiveMQTT(host, port, path, subscribe_topic, statusElement.style, scene.resource.edukit, basketStatus, scene, starStatus2)

    element.appendChild(eventElement)
  }

  //Send to PLC
  sendMQTT(topic, mes) {
    console.log(mes)
    this.client.publish(topic, JSON.stringify(mes))
  }

  //Recieve from PLC
  receiveMQTT(hostname, port, path, topic, status, edukit, basket, scene, starStatus2) {
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
    this.client = mqtt.connect({
      clientId,
      protocol: 'ws',
      reconnectPeriod: 1000,
      hostname: hostname,
      port: port,
      path: path
    })

    //컵 색상 여부 알고리즘 변수
    let _cup = 0
    let _cup2 = 0
    let _cup_color = false

    this.client.on('connect', () => {
      console.log('MQTT Connected')
      status.color = 'green'

      this.client.subscribe([topic], () => {
        console.log(`토픽 연결 완료: ${topic}`)
      })

      this.client.on('message', (topic, payload) => {
        // console.log(`토픽 ${topic}에서 전송된 메시지: ${payload.toString()}`);
        let message = JSON.parse(payload)
        try {
          let data = message.Wrapper.filter(
            p =>
            p.tagId === '1' ||  //start   data[0]
            p.tagId === '3' ||  //1호기 밀기   data[1]
            p.tagId === '4' ||  //2호기 상태   data[2]
            p.tagId === '6' ||  //컬러센서   data[3]
            p.tagId === '18' ||  //lap1   data[4]
            p.tagId === '19' ||  //lap1   data[5]
            p.tagId === '20' ||  //lap1   data[6]
            p.tagId === '40' ||  //3호기 상태   data[7]
            p.tagId === '21' ||  //1축 위치   data[8]
            p.tagId === '22'   //2축 위치   data[9]
          )
          
          // console.log(data);
          
          if(data[0].value === true){            
            starStatus2.innerText = "시작 되었습니다"
            starStatus2.style.color = 'green'
          } else{
            starStatus2.innerText = "종료 되었습니다"
            starStatus2.style.color = 'red'
          }


          if (data[1].value === true) {  
            _cup += 1
            _cup_color = false
          }

          if (_cup != _cup2 && data[3].value === true) {
            // _cup2 += 1
            _cup = 0
            _cup_color = true
          }

          if (data[2].value == true) {
            if (_cup_color == true) {
              basket.innerText = '흰색'
              console.log('흰색')
            } else if (_cup_color == false) {
              basket.innerText = '빨강색'
              console.log('빨간색')
            }
          }


          //light status
          if (data[4].value == true) {
            // console.log("green on")
            scene.trafficLight.trafficLight1.material.color.set(0x00ff00)
          } else if (data[4].value == false) {
            scene.trafficLight.trafficLight1.material.color.set(0x003300)
          }
          if (data[5].value == true) {
            // console.log("yellow on")
            scene.trafficLight.trafficLight2.material.color.set(0xffff00)
          } else if (data[5].value == false) {
            scene.trafficLight.trafficLight2.material.color.set(0x996600)
          }
          if (data[6].value == true) {
            // console.log("red on")
            scene.trafficLight.trafficLight3.material.color.set(0xff0000)
          } else if (data[6].value == false) {
            scene.trafficLight.trafficLight3.material.color.set(0x660000)
          }


          //1,2,3호기 실행상태
          if (data[1].value == true) {
            scene.trafficLight.statusLight1.material.color.set(0x00ff00)
          } else if (data[1].value == false) {
            scene.trafficLight.statusLight1.material.color.set(0x770000)
          }
          if (data[2].value == true) {
            scene.trafficLight.statusLight2.material.color.set(0x00ff00)
          } else if (data[2].value == false) {
            scene.trafficLight.statusLight2.material.color.set(0x770000)
          }
          if (data[7].value == true) {
            scene.trafficLight.statusLight3.material.color.set(0x00ff00)
          } else if (data[7].value == false) {
            scene.trafficLight.statusLight3.material.color.set(0x770000)
          }


          data = data.map(p => parseInt(p.value))
          edukit['yAxis'] = data[0]
          edukit['xAxis'] = data[1]
        } catch {
          console.log('catching...')
        }
      })
    })
  }
}

export { Event }
