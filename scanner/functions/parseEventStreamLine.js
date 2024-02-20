function parseEventStreamLine (
      lineBuffer,
      index,
      fieldLength,
      lineLength
    ) {
      if (lineLength === 0) {
        // We reached the last line of this event
        if (data.length > 0) {
          onParse({
            type: 'event',
            id: eventId,
            event: eventName || undefined,
            data: data.slice(0, -1) // remove trailing newline
          })

          data = ''
          eventId = undefined
        }
        eventName = undefined
        return
      }

      const noValue = fieldLength < 0
      const field = lineBuffer.slice(
        index,
        index + (noValue ? lineLength : fieldLength)
      )
      let step = 0

      if (noValue) {
        step = lineLength
      } else if (lineBuffer[index + fieldLength + 1] === ' ') {
        step = fieldLength + 2
      } else {
        step = fieldLength + 1
      }

      const position = index + step
      const valueLength = lineLength - step
      const value = lineBuffer
        .slice(position, position + valueLength)
        .toString()

      if (field === 'data') {
        data += value ? `${value}\n` : '\n'
      } else if (field === 'event') {
        eventName = value
      } else if (field === 'id' && !value.includes('\u0000')) {
        eventId = value
      } else if (field === 'retry') {
        const retry = parseInt(value, 10)
        if (!Number.isNaN(retry)) {
          onParse({ type: 'reconnect-interval', value: retry })
        }
      }
    }