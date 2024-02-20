function skipEmptyAndUnknownOptions(current) {
        var emptyOption_ = emptyOption && emptyOption[0];
        var unknownOption_ = unknownOption && unknownOption[0];

        // We cannot rely on the extracted empty option being the same as the compiled empty option,
        // because the compiled empty option might have been replaced by a comment because
        // it had an "element" transclusion directive on it (such as ngIf)
        if (emptyOption_ || unknownOption_) {
          while (current &&
                (current === emptyOption_ ||
                current === unknownOption_ ||
                current.nodeType === NODE_TYPE_COMMENT ||
                (nodeName_(current) === 'option' && current.value === ''))) {
            current = current.nextSibling;
          }
        }
        return current;
      }