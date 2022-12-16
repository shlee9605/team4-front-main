import * as THREE from 'three'

class Chips {
  constructor() {
    this.chip1 = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 0.8, 100),
        new THREE.MeshPhongMaterial({ color: 0x0ffffff, specular: 0x00ff00, shininess: 100 })
    )
    this.chip2 = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 0.8, 100),
        new THREE.MeshPhongMaterial({ color: 0x0ffffff, specular: 0x00ff00, shininess: 100 })
    )
    this.chip3 = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 0.8, 100),
        new THREE.MeshPhongMaterial({ color: 0x0ffffff, specular: 0x00ff00, shininess: 100 })
    )
    this.chip4 = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 0.8, 100),
        new THREE.MeshPhongMaterial({ color: 0x0ffffff, specular: 0x00ff00, shininess: 100 })
    )
    this.chip5 = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 0.8, 100),
        new THREE.MeshPhongMaterial({ color: 0x0ffffff, specular: 0x00ff00, shininess: 100 })
    )

    this.setChips()
  }

  setChips() {
    this.chip1.name = '칩1'
    this.chip1.position.x -= 15
    this.chip1.position.y += 0.3
    this.chip1.position.z += 7
    this.chip1.openEnded = true

    this.chip2.name = '칩2'
    this.chip2.position.x -= 15
    this.chip2.position.y += 1.3
    this.chip2.position.z += 3
    this.chip2.openEnded = true

    this.chip3.name = '칩3'
    this.chip3.position.x -= 15
    this.chip3.position.y += 2.3
    this.chip3.position.z += 3
    this.chip3.openEnded = true

    this.chip4.name = '칩4'
    this.chip4.position.x -= 15
    this.chip4.position.y += 3.3
    this.chip4.position.z += 3
    this.chip4.openEnded = true

    this.chip5.name = '칩5'
    this.chip5.position.x -= 15
    this.chip5.position.y += 4.3
    this.chip5.position.z += 3
    this.chip5.openEnded = true

  }
}

export { Chips }
