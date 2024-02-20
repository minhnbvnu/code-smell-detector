function alignableFor(cm, chunks, isOrig) {
    var tracker = cm.state.trackAlignable
    var start = cm.firstLine(), trackI = 0
    var result = []
    for (var i = 0;; i++) {
      var chunk = chunks[i]
      var chunkStart = !chunk ? 1e9 : isOrig ? chunk.origFrom : chunk.editFrom
      for (; trackI < tracker.alignable.length; trackI += 2) {
        var n = tracker.alignable[trackI] + 1
        if (n <= start) continue
        if (n <= chunkStart) result.push(n)
        else break
      }
      if (!chunk) break
      result.push(start = isOrig ? chunk.origTo : chunk.editTo)
    }
    return result
  }