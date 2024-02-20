function processLexem(buffer, lexem) {
      mode_buffer += buffer;
      if (lexem === undefined) {
        result += processBuffer();
        return 0;
      }

      var new_mode = subMode(lexem, top);
      if (new_mode) {
        result += processBuffer();
        startNewMode(new_mode, lexem);
        return new_mode.returnBegin ? 0 : lexem.length;
      }

      var end_mode = endOfMode(top, lexem);
      if (end_mode) {
        var origin = top;
        if (!(origin.returnEnd || origin.excludeEnd)) {
          mode_buffer += lexem;
        }
        result += processBuffer();
        do {
          if (top.className) {
            result += '</span>';
          }
          relevance += top.relevance;
          top = top.parent;
        } while (top != end_mode.parent);
        if (origin.excludeEnd) {
          result += escape(lexem);
        }
        mode_buffer = '';
        if (end_mode.starts) {
          startNewMode(end_mode.starts, '');
        }
        return origin.returnEnd ? 0 : lexem.length;
      }

      if (isIllegal(lexem, top))
        throw new Error('Illegal lexem "' + lexem + '" for mode "' + (top.className || '<unnamed>') + '"');

      /*
      Parser should not reach this point as all types of lexems should be caught
      earlier, but if it does due to some bug make sure it advances at least one
      character forward to prevent infinite looping.
      */
      mode_buffer += lexem;
      return lexem.length || 1;
    }