import * as THREE from 'three'

class Chips {
  constructor() {
    this.chip = []
    for (let i = 0; i < 5; i++) {
      this.chip.push(
        new THREE.Mesh(
          new THREE.CylinderGeometry(1, 1, 0.8, 100),
          new THREE.MeshPhongMaterial({ color: 0x777777, specular: 0x00ff00, shininess: 100 })
        )
      )
    }

    this.setChips()
  }

  setChips() {
    for (let i = 0; i < 5; i++) {
      this.chip[i].name = `칩${i}` //'칩'+toString(i)
      this.chip[i].position.x -= 15
      this.chip[i].position.y += 1.3
      this.chip[i].position.z += 3
      this.chip[i].layers.enable(1)
    }
  }
}

export { Chips }
