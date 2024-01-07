function updateHistoryState(text) {
    text = text.trim();
    const params = new URLSearchParams(window.location.search);
    if (text.length === 0) {
      params.delete('q');
    } else {
      params.set('q', text);
    }
    let fullUrl = window.location.pathname;
    if (params.toString().length !== 0) {
      fullUrl += `?${params.toString()}`;
    }
    history.replaceState(null, '', fullUrl);
  }