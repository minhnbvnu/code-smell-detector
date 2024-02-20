function testConvertFaces () {
  const toTest = [
    '你好啊[/微笑][惊讶]哈哈[/拜谢]'
  ]
  toTest.forEach(t => {
    console.log(convertFaces(t))
  })
}