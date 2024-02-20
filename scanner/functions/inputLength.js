function inputLength(input) {
        var text = input.val();

        if (options.twoCharLinebreak) {
          // Count all line breaks as 2 characters
          text = text.replace(/\r(?!\n)|\n(?!\r)/g, '\r\n');
        } else {
          // Remove all double-character (\r\n) linebreaks, so they're counted only once.
          text = text.replace(/(?:\r\n|\r|\n)/g, '\n');
        }

        var currentLength = 0;

        if (options.utf8) {
          currentLength = utf8Length(text);
        } else {
          currentLength = text.length;
        }

        // Remove "C:\fakepath\" from counter when using file input
        // Fix https://github.com/mimo84/bootstrap-maxlength/issues/146
        if (input.prop("type") === "file" && input.val() !== "") {
          currentLength -= 12;
        }

        return currentLength;
      }