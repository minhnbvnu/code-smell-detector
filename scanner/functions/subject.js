function subject() {
    state = SUBJECT
    gathered = ['!']
    stream.queue(token())
    state = READY
  }