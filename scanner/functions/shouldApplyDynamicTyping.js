function shouldApplyDynamicTyping(field) {
      if (_config.dynamicTypingFunction && _config.dynamicTyping[field] === void 0) {
        _config.dynamicTyping[field] = _config.dynamicTypingFunction(field);
      }
      return (_config.dynamicTyping[field] || _config.dynamicTyping) === true;
    }