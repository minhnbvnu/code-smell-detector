function leaveBlock(){
    blockContext = Object.getPrototypeOf(blockContext)
  }