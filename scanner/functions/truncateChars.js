function truncateChars(input, maxlength) {
        var text = input.val();

        if (options.twoCharLinebreak) {
          text = text.replace(/\r(?!\n)|\n(?!\r)/g, '\r\n');

          if (text[text.length - 1] === '\n') {
            maxlength -= text.length % 2;
          }
        }

        if (options.utf8) {
          var indexedSize = text.split("").map(utf8CharByteCount);
          for (
            var removedBytes = 0,
              bytesPastMax = utf8Length(text) - maxlength; removedBytes < bytesPastMax; removedBytes += indexedSize.pop()
          );
          maxlength -= (maxlength - indexedSize.length);
        }

        input.val(text.substr(0, maxlength));
      }