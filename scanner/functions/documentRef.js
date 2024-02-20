function documentRef () {
    if (read('DocumentRef-')) {
      var string = expectIdstring()
      return {type: 'DOCUMENTREF', string: string}
    }
  }