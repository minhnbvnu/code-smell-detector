function printCircularLog(stack, type) {
    util.log('Found circular dependencies:', stack.join(' --> '), type)
  }