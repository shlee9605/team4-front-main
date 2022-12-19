const movementhandler = {
  mech1_move(chip_mov1, chip1, chip2, scene) {
    if (chip_mov1[chip1 - 1] == true) {
      scene.chips.chip[chip1 - 1].position.y -= 0.2
      scene.chips.chip[chip1 - 1].position.z += 1
    } else if (chip_mov1[chip2 - 1] == true) {
      scene.chips.chip[chip2 - 1].position.y -= 0.2
      scene.chips.chip[chip2 - 1].position.z += 1
    }
  },
  mech1_set(chip, scene) {
    scene.chips.chip[chip - 1].position.x = -15
    scene.chips.chip[chip - 1].position.y = 0.3
    scene.chips.chip[chip - 1].position.z = 7
  },
  mech2_move(chip_mov2, chip1, chip2, scene) {
    if (chip_mov2[chip1 - 1] == true) {
      scene.chips.chip[chip1 - 1].position.x += 0.5
    } else if (chip_mov2[chip2 - 1] == true) {
      scene.chips.chip[chip2 - 1].position.x += 0.5
    }
  },
  mech2_set(chip, scene) {
    scene.chips.chip[chip - 1].position.x = 10
    scene.chips.chip[chip - 1].position.y = 2.3
    scene.chips.chip[chip - 1].position.z = 7
  },
  med_move(chip_med, chip1, chip2, scene) {
    if (chip_med[chip1 - 1] == true) {
      scene.chips.chip[chip1 - 1].position.x += 0.5
    } else if (chip_med[chip2 - 1] == true) {
      scene.chips.chip[chip2 - 1].position.x += 0.5
    }
  },
  mech2_mediate(chip, scene) {
    scene.chips.chip[chip - 1].position.x = -5
    scene.chips.chip[chip - 1].position.y = 0.3
    scene.chips.chip[chip - 1].position.z = 7
  },
  mech3_move(chip_mov3, chip1, chip2, scene, yAxis, xAxis) {
    if (chip_mov3[chip1 - 1] == true) {
      scene.chips.chip[chip1 - 1].position.y = 1.8 + (20 * (yAxis / 100000)) / 31
      scene.chips.chip[chip1 - 1].position.x = 11 - xAxis / 3600000
      scene.chips.chip[chip1 - 1].position.z = 7 + xAxis / 4500000
    } else if (chip_mov3[chip2 - 1] == true) {
      scene.chips.chip[chip2 - 1].position.y = 1.8 + (20 * (yAxis / 100000)) / 31
      scene.chips.chip[chip2 - 1].position.x = 11 - xAxis / 3600000
      scene.chips.chip[chip2 - 1].position.z = 7 + xAxis / 4500000
    }
  },
  mech3_set(chip, scene, true_height) {
    scene.chips.chip[chip - 1].position.x = 6
    scene.chips.chip[chip - 1].position.y = 0.3 + true_height
    scene.chips.chip[chip - 1].position.z = 11
  }
}

export default movementhandler
