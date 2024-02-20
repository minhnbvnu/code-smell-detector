function updateNetworkStatus() {
    if (navigator.onLine) {
      metaTagTheme.setAttribute('content', '#0288d1');
      headerElement.classList.remove('app__offline');
    }
    else {
      toast('App is offline');
      metaTagTheme.setAttribute('content', '#6b6b6b');
      headerElement.classList.add('app__offline');
    }
  }