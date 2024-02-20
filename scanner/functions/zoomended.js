function zoomended(dispatch) {
      if (!--zooming) dispatch({
        type: "zoomend"
      });
      center0 = null;
    }