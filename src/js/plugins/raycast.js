const calculate = {
  ray(event, renderer) {
    const cx = event.clientX
    const cy = event.clientY
    const tx = event.offsetX  //offset 흰색 공간
    const ty = event.offsetY

    const bx = cx - tx  //흰색공간 크기찾기
    const by = cy - ty
    const rx = cx - bx  //그 크기 빼주기
    const ry = cy - by

    const width = renderer.domElement.clientWidth
    const height = renderer.domElement.clientHeight

    const wx = rx / width
    const wy = ry / height

    const x = wx * 2 - 1
    const y = -wy * 2 + 1
    return { x, y }
  }
}

export default calculate
