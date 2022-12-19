const statehandler = {
  start_state(data, start) {
    if (data.value === true) {
      start.innerText = '시작 되었습니다'
      start.style.color = 'green'
    } else {
      start.innerText = '종료 되었습니다'
      start.style.color = 'red'
    }
  },

  mech1_state(data, scene) {
    if (data.value == true) {
      scene.trafficLight.statusLight1.material.color.set(0x00ff00)
    } else if (data.value == false) {
      scene.trafficLight.statusLight1.material.color.set(0x770000)
    }
  },

  mech2_state(mech1, prev_mech1, mech2, prev_mech2, scene) {
    if (mech1 == false && prev_mech1 == true) {
      scene.trafficLight.statusLight2.material.color.set(0x00ff00)
    } else if (mech2 == true && prev_mech2 == false) {
      scene.trafficLight.statusLight2.material.color.set(0x770000)
    }
  },

  mech3_state(data, scene) {
    if (data.value == true) {
      scene.trafficLight.statusLight3.material.color.set(0x00ff00)
    } else if (data.value == false) {
      scene.trafficLight.statusLight3.material.color.set(0x770000)
    }
  },

  light_state(data_green, data_yello, data_red, scene) {
    //light status
    if (data_green.value == true) {
      // console.log("green on")
      scene.trafficLight.trafficLight1.material.color.set(0x00ff00)
    } else if (data_green.value == false) {
      scene.trafficLight.trafficLight1.material.color.set(0x003300)
    }
    if (data_yello.value == true) {
      // console.log("yellow on")
      scene.trafficLight.trafficLight2.material.color.set(0xffff00)
    } else if (data_yello.value == false) {
      scene.trafficLight.trafficLight2.material.color.set(0x996600)
    }
    if (data_red.value == true) {
      // console.log("red on")
      scene.trafficLight.trafficLight3.material.color.set(0xff0000)
    } else if (data_red.value == false) {
      scene.trafficLight.trafficLight3.material.color.set(0x660000)
    }
  }
}

export default statehandler
