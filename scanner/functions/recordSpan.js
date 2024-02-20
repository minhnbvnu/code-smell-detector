function recordSpan(stream) {
      stream.on('data', function (span) {
        if (spanReceivedListener) {
          spanReceivedListener(span, stream.metadata)
        }
      })

      // this is necessary to properly end calls and cleanup
      stream.on('end', () => {
        stream.end()
      })
    }