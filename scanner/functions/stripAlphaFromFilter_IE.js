function stripAlphaFromFilter_IE(filter) {
    return (filter || '').replace(/alpha\([^\)]*\)/gi, '');
  }