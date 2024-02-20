function lifecycle() {
        ee.once('transaction', process.nextTick.bind(process, handler))
        ee.emit('transaction')
      }