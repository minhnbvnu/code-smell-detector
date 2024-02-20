function updateSearchParams (panelset, panel, params = new URLSearchParams(window.location.search)) {
      if (panel) {
        params.set(panelset, panel)
      } else {
        params.delete(panelset)
      }
      return params
    }