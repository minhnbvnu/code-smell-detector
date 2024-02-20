function getFormatStringFrom (formattedString) {
      var chunks = formattedString.match(R_FORMAT_CHUNKS);

      if (!chunks) {
        // chunks will be null if there were no tokens to parse in
        // formattedString (for example, if formattedString is '2').  Coerce
        // chunks to be useful here.
        chunks = ['', ''];

        // If there is only one chunk, assume that the string is a number
        // followed by a token...
        // NOTE: This may be an unwise assumption.
      } else if (chunks.length === 1 ||
          // ...or if the string starts with a number component (".", "-", or a
          // digit)...
          formattedString[0].match(R_NUMBER_COMPONENT)) {
        // ...prepend an empty string here to make sure that the formatted number
        // is properly replaced by VALUE_PLACEHOLDER
        chunks.unshift('');
      }

      return chunks.join(VALUE_PLACEHOLDER);
    }