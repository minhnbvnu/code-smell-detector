function startStateFn() {
    return {
      inComment : false,
      inString : false,
      inAttributeList : false,
      inScript : false
    };
  }