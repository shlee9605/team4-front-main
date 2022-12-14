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
import movementhandler from '../plugins/movementhandler'
import store from '../../store/index'
import router from '../../router/index'

class Event {
  constructor(element, renderer, scene) {
    ////config////
    const publish_topic = process.env.VUE_APP_PUBLISH_TOPIC
    const subscribe_topic = process.env.VUE_APP_SUBSCRIBE_TOPIC

    // port, host, path 초기 설정 (에러 방지를 위해 임의로 0을 기입)
    let port = 0
    let host = 0
    let path = 0

    // 부서 및 라우터 정보 호출
    const departmentList = store.getters.DepartmentList
    const routerCode = router.history.current.params.depCode

    // 부서코드가 같을 때의 port, host, path 가져오기
    for (const indx in departmentList) {
      if (departmentList[indx].code == routerCode) {
        port = departmentList[indx].port
        host = departmentList[indx].host
        path = departmentList[indx].path
      }
    }
    console.log(port, host, path)

    const raycast1 = new THREE.Raycaster()
    raycast1.layers.set(1)

    const raycast2 = new THREE.Raycaster()
    
    const pointer = new THREE.Vector2()

    renderer.domElement.addEventListener('pointerdown', event => {
      const xy = calculate.ray(event, renderer)
      const x = xy.x
      const y = xy.y

      pointer.set(x, y)

      raycast1.setFromCamera(pointer, scene.camera.cameraElement)
      try{
      const intersects = raycast1.intersectObjects(scene.scene.children)

      if (intersects) {
        const intersect = intersects[0]
        const message = ThreeButtonHandler.Handling(intersect, scene)
        if(message != null){
          this.sendMQTT(publish_topic, { tagId: message.tagId, value: message.value })
        }
      }
      }catch{}
    })

    renderer.domElement.addEventListener('pointermove', event => {
      const xy = calculate.ray(event, renderer)
      const x = xy.x
      const y = xy.y

      pointer.set(x, y)

      raycast2.setFromCamera(pointer, scene.camera.cameraElement)
      const intersects = raycast2.intersectObjects(scene.scene.children)

      if (intersects) {
        const intersect = intersects[0]
        ThreeButtonHandler.Experience(intersect, scene)
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
      buttonhandler.buttonConnect(startButton, stopButton, resetButton, scene)
      if (this.client) this.client.end()
      this.receiveMQTT(
        host,
        port,
        path,
        subscribe_topic,
        statusElement.style,
        scene,
        basketStatus,
        startStatus2,
        diceStatus
      )
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
    diceStatus.innerText = '판별 중...'
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
    this.receiveMQTT(
      host,
      port,
      path,
      subscribe_topic,
      statusElement.style,
      scene,
      basketStatus,
      startStatus2,
      diceStatus
    )

    element.appendChild(eventElement)
  }

  //Send to PLC
  sendMQTT(topic, mes) {
    console.log(mes)
    this.client.publish(topic, JSON.stringify(mes))
  }

  //Receive from PLC
  receiveMQTT(hostname, port, path, topic, status, scene, basket, start, dice) {
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
    let dice_state = false

    let mech1 = false //1호기 상태
    let prev_mech1 = false
    let mech2 = false //2호기 상태
    let prev_mech2 = false
    let mech3 = false //3호기 상태
    let prev_mech3 = false

    let false_height = 0 //양/불량 높이
    let true_height = 0

    let chip1 = 0
    let chip2 = 0

    let chip_mov1 = [false, false, false, false, false]
    let chip_mov2 = [false, false, false, false, false]
    let chip_med = [false, false, false, false, false]
    let chip_mov3 = [false, false, false, false, false]

    this.client.on('connect', () => {
      console.log('MQTT Connected')
      status.color = 'green'

      this.client.subscribe([topic], () => {
        console.log(`토픽 연결 완료: ${topic}`)
      })

      this.client.on('message', (topic, payload) => {
        try {
          // console.log(`토픽 ${topic}에서 전송된 메시지: ${payload.toString()}`);
          let message = JSON.parse(payload)
          try {
            prev_mech1 = mech1
            prev_mech2 = mech2
            prev_mech3 = mech3

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
                p.tagId === '15' || //No1 Count   data[8]
                p.tagId === '21' || //1축 위치   data[9]
                p.tagId === '22' || //2축 위치   data[10]
                p.tagId === '37' //주사위 숫자   data[11]
            )
            // console.log(data)
            mech1 = data[0].value
            mech2 = data[1].value
            mech3 = data[7].value

            statehandler.start_state(data[6], start) //진행 상태

            ////chip movement////
            //mech1 movement
            // console.log(chip1, chip2)
            if (mech1 == true && prev_mech1 == false) {
              if (chip1 == 0) {
                chip1 = data[8].value
                chip_mov1[chip1 - 1] = true
              } else if (chip2 == 0) {
                chip2 = data[8].value
                chip_mov1[chip2 - 1] = true
              }
            }
            movementhandler.mech1_move(chip_mov1, chip1, chip2, scene)

            if (mech1 == false && prev_mech1 == true) {
              if (chip_mov1[chip1 - 1] == true) {
                chip_mov1[chip1 - 1] = false
                chip_mov2[chip1 - 1] = true
                movementhandler.mech1_set(chip1, scene)
              } else if (chip_mov1[chip2 - 1] == true) {
                chip_mov1[chip2 - 1] = false
                chip_mov2[chip2 - 1] = true
                movementhandler.mech1_set(chip2, scene)
              }
            }
            movementhandler.mech2_move(chip_mov2, chip1, chip2, scene)

            if (mech2 == false && prev_mech2 == true) {
              if (chip_mov2[chip1 - 1] == true) {
                chip_mov2[chip1 - 1] = false
                chip_med[chip1 - 1] = true
                movementhandler.mech2_mediate(chip1, scene)
              } else if (chip_mov2[chip2 - 1] == true) {
                chip_mov2[chip2 - 1] = false
                chip_med[chip2 - 1] = true
                movementhandler.mech2_mediate(chip2, scene)
              }
            }

            movementhandler.med_move(chip_med, chip1, chip2, scene)

            //set if false
            if (chip_med[chip1 - 1] == true) {
              if (scene.chips.chip[chip1 - 1].position.x > 15) {
                scene.chips.chip[chip1 - 1].position.x = 15
                scene.chips.chip[chip1 - 1].position.y = -2.3 + false_height
                scene.chips.chip[chip1 - 1].position.z = 7
                // chip_mov3[chip1-1]=true
                chip_med[chip1 - 1] = false
                chip1 = 0
                false_height += 1
              }
            } else if (chip_med[chip2 - 1] == true) {
              if (scene.chips.chip[chip2 - 1].position.x > 15) {
                scene.chips.chip[chip2 - 1].position.x = 15
                scene.chips.chip[chip2 - 1].position.y = -2.3 + false_height
                scene.chips.chip[chip2 - 1].position.z = 7
                // chip_mov3[chip2-1]=true
                chip_med[chip2 - 1] = false
                chip2 = 0
                false_height += 1
              }
            }

            //set if true
            if (mech3 == true && prev_mech3 == false) {
              if (chip_mov3[chip1 - 1] == false) {
                chip_med[chip1 - 1] = false
                chip_mov3[chip1 - 1] = true
                movementhandler.mech2_set(chip1, scene)
              } else if (chip_mov3[chip2 - 1] == false) {
                chip_med[chip2 - 1] = false
                chip_mov3[chip2 - 1] = true
                movementhandler.mech2_set(chip2, scene)
              }
            }
            movementhandler.mech3_move(chip_mov3, chip1, chip2, scene, data[9].value, data[10].value)

            if (mech3 == false && prev_mech3 == true) {
              if (chip_mov3[chip1 - 1] == true) {
                movementhandler.mech3_set(chip1, scene, true_height)
                chip_mov3[chip1 - 1] = false
                chip1 = 0
                true_height += 1
              } else if (chip_mov3[chip2 - 1] == true) {
                movementhandler.mech3_set(chip2, scene, true_height)
                chip_mov3[chip2 - 1] = false
                chip2 = 0
                true_height += 1
              }
            }

            //cup color & dice판별
            if (mech1 == true && prev_mech1 == false) {
              basket.innerText = '판별 중...'
              basket.style.color = 'black'
              cup_state = true
              dice.innerText = '판별 중...'
              dice.style.color = 'black'
              dice_state = true
            }

            if (cup_state == true) {
              if (data[2].value == true) {
                basket.innerText = '흰색'
                basket.style.color = 'green'
                if (chip_mov2[chip1 - 1] == true) {
                  scene.chips.chip[chip1 - 1].material.color.set(0xffffff)
                } else if (chip_mov2[chip2 - 1] == true) {
                  scene.chips.chip[chip2 - 1].material.color.set(0xffffff)
                }
                cup_state == false
              } else if (cup_state == true && mech1 == false && prev_mech1 == true) {
                basket.innerText = '빨간색'
                basket.style.color = 'red'
                if (chip_mov2[chip1 - 1] == true) {
                  scene.chips.chip[chip1 - 1].material.color.set(0x770000)
                } else if (chip_mov2[chip2 - 1] == true) {
                  scene.chips.chip[chip2 - 1].material.color.set(0x770000)
                }
                cup_state == false
              }
            }

            if (dice_state == true) {
              if (data[11].value != 0) {
                dice.innerText = `${data[11].value}`
                dice.style.color = 'blue'
                dice_state == false
              }
            }

            //신호등
            statehandler.light_state(data[3], data[4], data[5], scene)

            //1,2,3호기 실행상태
            statehandler.mech1_state(data[0], scene)
            statehandler.mech2_state(mech1, prev_mech1, mech2, prev_mech2, scene)
            statehandler.mech3_state(data[7], scene)

            data = data.map(p => parseInt(p.value))
            scene.resource.edukit['yAxis'] = data[9]
            scene.resource.edukit['xAxis'] = data[10]
          } catch {
            console.log('catching...')
          }
        } catch {
          console.log('catching...')
        }
      })
    })
  }
}

export { Event }
