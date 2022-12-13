import * as THREE from 'three'

class Chips {
  constructor() {
    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2000, 2000),
      new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
    )

    this.chip1 = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 0.3, 100),
        new THREE.MeshPhongMaterial({ color: 0x0ffffff, specular: 0x00ff00, shininess: 100 })
    )
    this.chip2 = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 0.3, 100),
        new THREE.MeshPhongMaterial({ color: 0x0ffffff, specular: 0x00ff00, shininess: 100 })
    )
    this.chip3 = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 0.3, 100),
        new THREE.MeshPhongMaterial({ color: 0x0ffffff, specular: 0x00ff00, shininess: 100 })
    )
    this.chip4 = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 0.3, 100),
        new THREE.MeshPhongMaterial({ color: 0x0ffffff, specular: 0x00ff00, shininess: 100 })
    )
    this.chip5 = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 0.3, 100),
        new THREE.MeshPhongMaterial({ color: 0x0ffffff, specular: 0x00ff00, shininess: 100 })
    )

    this.setButton()
  }

  setButton() {
    this.mesh.rotation.x = -Math.PI / 2
    this.mesh.receiveShadow = true

    this.chip1.name = '칩1'
    this.chip1.position.x -= 15
    this.chip1.position.y += 0
    this.chip1.position.z += 7
    this.chip1.openEnded = true

    this.chip2.name = '칩2'
    this.chip2.position.x -= 17
    this.chip2.position.y += 0
    this.chip2.position.z += 7
    this.chip2.openEnded = true

    this.chip3.name = '칩3'
    this.chip3.position.x -= 17
    this.chip3.position.y += 0
    this.chip3.position.z += 7
    this.chip3.openEnded = true

    this.chip4.name = '칩4'
    this.chip4.position.x -= 17
    this.chip4.position.y += 0
    this.chip4.position.z += 7
    this.chip4.openEnded = true

    this.chip5.name = '칩5'
    this.chip5.position.x -= 17
    this.chip5.position.y += 0
    this.chip5.position.z += 7
    this.chip5.openEnded = true

  }
}

export { Chips }
