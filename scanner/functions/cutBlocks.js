function cutBlocks (arr, blocks) {
    let sign = 0
    for (let i = 1, al = arr.length; i < al; i += 1) {
      if (arr[i].charCodeAt(0) > 64 && arr[i].charCodeAt(0) < 91) {
        sign++
        blocks.push(arr.splice(0, i))
        cutBlocks(arr, blocks)
        break
      }
    }
    if (!sign) {
      blocks.push(arr)
    }
  }