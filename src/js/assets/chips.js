import * as THREE from 'three'

class Chips {
  constructor() {
    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2000, 2000),
      new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
    )

    this.chip1 = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 1, 100),
        new THREE.MeshPhongMaterial({ color: 0x0ffffff, specular: 0x00ff00, shininess: 100 })
    )
    this.chip2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 32, 32),
        new THREE.MeshPhongMaterial({ 
            color: 'pink', 
            emissive: 0, 
            specular: 0x070707, 
            shininess: 100 
         })
    )


    this.setButton()
  }

  setButton() {
    this.mesh.rotation.x = -Math.PI / 2
    this.mesh.receiveShadow = true

    this.chip1.name = '1호기'
    this.chip1.position.x -= 15
    this.chip1.position.y += 0
    this.chip1.position.z += 7
    this.chip1.openEnded = true

  }
}

export { Chips }
