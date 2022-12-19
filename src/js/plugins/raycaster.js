import store from '../../store'

const ThreeButtonHandler = {
  Experience(intersect, scene) {
    if (intersect.object.parent.name == '비전센서그룹') {
      scene.visionSensor.visionSensorFloor.material.color.set(0x0f0f10)
      scene.visionSensor.visionSensorTowerSection.material.color.set(0x606062)
      scene.visionSensor.visionSensorJipSection.material.color.set(0x606062)
      scene.visionSensor.SensorVision.material.color.set(0x0f0f10)
    }
    else{
      scene.visionSensor.visionSensorFloor.material.color.set(0xff3300)
      scene.visionSensor.visionSensorTowerSection.material.color.set(0xffff00)
      scene.visionSensor.visionSensorJipSection.material.color.set(0x3333cc)
      scene.visionSensor.SensorVision.material.color.set(0x33ff33)
    }
  },
  Handling(intersect, scene) {
    if (intersect.object.name == '1호기') {
      if (scene.button.button9.position.y == 0.5) {
        intersect.object.material.color.set(0x770000)
        scene.button.button9.position.y -= 0.5
        return { tagId: '9', value: '0' }
      } else {
        intersect.object.material.color.set(0x007700)
        scene.button.button9.position.y += 0.5
        return { tagId: '9', value: '1' }
      }
    }

    if (intersect.object.name == 'SEN 1') {
      if (scene.button.button12.position.y == 0.5) {
        intersect.object.material.color.set(0x770000)
        scene.button.button12.position.y -= 0.5
        return { tagId: '12', value: '0' }
      } else {
        intersect.object.material.color.set(0x007700)
        scene.button.button12.position.y += 0.5
        return { tagId: '12', value: '1' }
      }
    }

    if (intersect.object.name == '2호기') {
      if (scene.button.button10.position.y == 0.5) {
        intersect.object.material.color.set(0x770000)
        scene.button.button10.position.y -= 0.5
        return { tagId: '10', value: '0' }
      } else {
        intersect.object.material.color.set(0x007700)
        scene.button.button10.position.y += 0.5
        return { tagId: '10', value: '1' }
      }
    }

    if (intersect.object.name == 'SEN 2') {
      if (scene.button.button13.position.y == 0.5) {
        intersect.object.material.color.set(0x770000)
        scene.button.button13.position.y -= 0.5
        return { tagId: '13', value: '0' }
      } else {
        intersect.object.material.color.set(0x007700)
        scene.button.button13.position.y += 0.5
        return { tagId: '13', value: '1' }
      }
    }

    if (intersect.object.name == '3호기') {
      if (scene.button.button11.position.y == 0.5) {
        intersect.object.material.color.set(0x770000)
        scene.button.button11.position.y -= 0.5
        return { tagId: '11', value: '0' }
      } else {
        intersect.object.material.color.set(0x007700)
        scene.button.button11.position.y += 0.5
        return { tagId: '11', value: '1' }
      }
    }

    if (intersect.object.parent.name == '비전센서그룹') {
      store.commit('setVisionObjectClick')
      // console.log('비전센서 클릭 => 상태값', store.getters.VisionObjectClick)
      return null
    }
  }
}

export default ThreeButtonHandler
