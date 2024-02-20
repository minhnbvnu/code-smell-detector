function probablyInsideString(cm, pos, line) {
    return /\bstring\b/.test(cm.getTokenTypeAt(Pos(pos.line, 0))) && !/^[\'\"\`]/.test(line)
  }