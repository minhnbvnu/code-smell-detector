function recordSpanBatch(stream) {
      stream.on('data', function ({ spans }) {
        if (spanReceivedListener) {
          spanReceivedListener(spans, stream.metadata)
        }
      })

      // this is necessary to properly end calls and cleanup
      stream.on('end', () => {
        stream.end()
      })
    }