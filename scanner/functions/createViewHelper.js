function createViewHelper(view, label, shouldScrollVertically = false, shouldResizeVertically = false) {
      let verticalScrollView = null;

      if (shouldScrollVertically) {
        verticalScrollView = new VerticalScrollView_VerticalScrollView(surface, defaultFrame, view, viewState, label);
      }

      const horizontalPanAndZoomView = new HorizontalPanAndZoomView_HorizontalPanAndZoomView(surface, defaultFrame, verticalScrollView !== null ? verticalScrollView : view, data.duration, viewState);
      let resizableView = null;

      if (shouldResizeVertically) {
        resizableView = new ResizableView_ResizableView(surface, defaultFrame, horizontalPanAndZoomView, viewState, canvasRef, label);
      }

      return resizableView || horizontalPanAndZoomView;
    }