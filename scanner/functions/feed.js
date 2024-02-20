function feed (chunk) {
      buffer = buffer ? buffer + chunk : chunk

      // Strip any UTF8 byte order mark (BOM) at the start of the stream.
      // Note that we do not strip any non - UTF8 BOM, as eventsource streams are
      // always decoded as UTF8 as per the specification.
      if (isFirstChunk && hasBom(buffer)) {
        buffer = buffer.slice(BOM.length)
      }

      isFirstChunk = false

      // Set up chunk-specific processing state
      const length = buffer.length
      let position = 0
      let discardTrailingNewline = false

      // Read the current buffer byte by byte
      while (position < length) {
        // EventSource allows for carriage return + line feed, which means we
        // need to ignore a linefeed character if the previous character was a
        // carriage return
        // @todo refactor to reduce nesting, consider checking previous byte?
        // @todo but consider multiple chunks etc
        if (discardTrailingNewline) {
          if (buffer[position] === '\n') {
            ++position
          }
          discardTrailingNewline = false
        }

        let lineLength = -1
        let fieldLength = startingFieldLength
        let character

        for (
          let index = startingPosition;
          lineLength < 0 && index < length;
          ++index
        ) {
          character = buffer[index]
          if (character === ':' && fieldLength < 0) {
            fieldLength = index - position
          } else if (character === '\r') {
            discardTrailingNewline = true
            lineLength = index - position
          } else if (character === '\n') {
            lineLength = index - position
          }
        }

        if (lineLength < 0) {
          startingPosition = length - position
          startingFieldLength = fieldLength
          break
        } else {
          startingPosition = 0
          startingFieldLength = -1
        }

        parseEventStreamLine(buffer, position, fieldLength, lineLength)

        position += lineLength + 1
      }

      if (position === length) {
        // If we consumed the entire buffer to read the event, reset the buffer
        buffer = ''
      } else if (position > 0) {
        // If there are bytes left to process, set the buffer to the unprocessed
        // portion of the buffer only
        buffer = buffer.slice(position)
      }
    }