async function readResult(stream) {
    let reader = stream.getReader();
    let result = '';
    while (true) {
      let {done, value} = await reader.read();
      if (done) {
        return result;
      }
      result += Buffer.from(value).toString('utf8');
    }
  }