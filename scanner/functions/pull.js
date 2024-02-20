function pull() {
                  return reader.read().then(function (result) {
                    chunks.push(result.value);
                    return result.done ? chunks : pull();
                  });
                }