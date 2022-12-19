import { Group } from 'three'
import * as THREE from 'three'

class VisionSensor {
  constructor() {
    this.obj = new Group()

    this.visionSensorFloor = new THREE.Mesh(
      new THREE.BoxGeometry(5, 0.4, 3, 100),
      new THREE.MeshPhongMaterial({ color: 0x0f0f10, specular: 0xff3300, shininess: 100 })
    )
    this.visionSensorTowerSection = new THREE.Mesh(
      new THREE.BoxGeometry(4, 10, 0.5, 100),
      new THREE.MeshPhongMaterial({ color: 0xffff00, specular: 0xffff00, shininess: 100 })
    )
    this.visionSensorJipSection = new THREE.Mesh(
      new THREE.BoxGeometry(5, 0.3, 0.5, 100),
      new THREE.MeshPhongMaterial({ color: 0x3333cc, specular: 0x3333cc, shininess: 100 })
    )
    this.SensorVision = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 3, 100),
      new THREE.MeshPhongMaterial({ color: 0x33ff33, specular: 0x00ff00, shininess: 100 })
    )
    this.visionSensor()
  }

  visionSensor() {
    this.visionSensorFloor.rotateY(-(Math.PI / 2))
    this.visionSensorFloor.name = '비전센서바닥'
    this.visionSensorFloor.position.x += 0
    this.visionSensorFloor.position.y += 0.15
    this.visionSensorFloor.position.z += 0
    this.visionSensorFloor.layers.enable(1)

    this.visionSensorTowerSection.rotateY(-(Math.PI / 2))
    this.visionSensorTowerSection.name = '비전센서메인기둥'
    this.visionSensorTowerSection.position.x += 0
    this.visionSensorTowerSection.position.y += 5.15
    this.visionSensorTowerSection.position.z += 0
    this.visionSensorTowerSection.layers.enable(1)

    this.visionSensorJipSection.rotateY(-(Math.PI / 2))
    this.visionSensorJipSection.name = '비전센서팔'
    this.visionSensorJipSection.position.x += 0
    this.visionSensorJipSection.position.y += 10
    this.visionSensorJipSection.position.z += 4.5
    this.visionSensorJipSection.layers.enable(1)

    this.SensorVision.rotateY(-(Math.PI / 2))
    this.SensorVision.name = '비전센서'
    this.SensorVision.position.x += 0
    this.SensorVision.position.y += 9.6
    this.SensorVision.position.z += 6.4
    this.SensorVision.layers.enable(1)

    //비전센서 4가지를 그룹화 해주고 이름을 넣어줌
    this.obj.add(this.visionSensorFloor, this.visionSensorTowerSection, this.visionSensorJipSection, this.SensorVision)
    this.obj.name = '비전센서그룹'
  }
}

export { VisionSensor }
