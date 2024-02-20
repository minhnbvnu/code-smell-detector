function mknode(mode, sourcetoken) {
  return {
      mode: mode
    , token: sourcetoken
    , children: []
    , type: stmt_type[mode]
//    , id: (Math.random() * 0xFFFFFFFF).toString(16)
  }
}