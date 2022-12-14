/**
 * 목표 기기의 실시간 정보를 연결하는 파트입니다
 * 방식은 자유지만 본 프로젝트에서는 mqtt를 사용함
 */
import mqtt from 'mqtt'
import * as THREE from 'three'
import calculate from '../plugins/raycast'
import ThreeButtonHandler from '../plugins/raycaster'
import buttonhandler from '../plugins/buttonhandler'
import statehandler from '../plugins/statehandler'

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
      this.receiveMQTT(host, port, path, subscribe_topic, statusElement.style, scene, basketStatus, startStatus2)
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

    const startStatus = eventElement.appendChild(document.createElement('pre'))
    startStatus.innerText = '시작 상태 :'
    startStatus.style.position = 'relative'
    startStatus.style.right = '200%'
    startStatus.style.top = '15%'

    const startStatus2 = eventElement.appendChild(document.createElement('pre'))
    startStatus2.innerText = '종료 되었습니다'
    startStatus2.style.color = 'red'
    startStatus2.style.position = 'relative'
    startStatus2.style.right = '110%'
    startStatus2.style.top = '9.8%'

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
    basketStatus.innerText = '판별 중...'
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
    this.receiveMQTT(host, port, path, subscribe_topic, statusElement.style, scene, basketStatus, startStatus2)

    element.appendChild(eventElement)
  }

  //Send to PLC
  sendMQTT(topic, mes) {
    console.log(mes)
    this.client.publish(topic, JSON.stringify(mes))
  }

  //Recieve from PLC
  receiveMQTT(hostname, port, path, topic, status, scene, basket, start) {
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
    let cup_state = false

    let mech1 = false //1호기 상태
    let prev_mech1 = false
    let mech2 = false //2호기 상태
    let prev_mech2 = false

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
          prev_mech1 = mech1
          prev_mech2 = mech2

          let data = message.Wrapper.filter(
            p =>
              p.tagId === '3' || //1호기 밀기   data[0]
              p.tagId === '4' || //2호기 상태   data[1]
              p.tagId === '6' || //컬러센서   data[2]
              p.tagId === '18' || //lap1   data[3]
              p.tagId === '19' || //lap1   data[4]
              p.tagId === '20' || //lap1   data[5]
              p.tagId === '35' || //belt   data[6]
              p.tagId === '40' || //3호기 상태   data[7]
              p.tagId === '21' || //1축 위치   data[8]
              p.tagId === '22' //2축 위치   data[9]
          )
          mech1 = data[0].value
          mech2 = data[1].value

          statehandler.start_state(data[6], start) //진행 상태

          //cup color 판별
          if (mech1 == true && prev_mech1 == false) {
            basket.innerText = '판별 중...'
            basket.style.color = 'black'
            cup_state = true
          }

          if (cup_state == true) {
            if (data[2].value == true) {
              basket.innerText = '흰색'
              basket.style.color = 'blue'
              cup_state == false
            } else if (cup_state == true && mech1 == false && prev_mech1 == true) {
              basket.innerText = '빨간색'
              basket.style.color = 'red'
              cup_state == false
            }
          }

          //신호등
          statehandler.light_state(data[3], data[4], data[5], scene)

          //1,2,3호기 실행상태
          statehandler.mech1_state(data[0], scene)
          statehandler.mech2_state(mech1, prev_mech1, mech2, prev_mech2, scene)
          statehandler.mech3_state(data[7], scene)

          data = data.map(p => parseInt(p.value))
          scene.resource.edukit['yAxis'] = data[8]
          scene.resource.edukit['xAxis'] = data[9]
        } catch {
          console.log('catching...')
        }
      })
    })
  }
}

export { Event }
