function DEBUG_BLOCK_ENTER(hash) {
  let frame = this.pushFrame(INSTR.BLOCK_ENTER, hash);
  frame.values = [hash];
}