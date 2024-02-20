function localToCanvasCoordinates(localCoordinates) {
      // $FlowFixMe[incompatible-call] found when upgrading Flow
      const canvasRect = cacheFirstGetCanvasBoundingRect(canvas);
      return {
        x: localCoordinates.x - canvasRect.left,
        y: localCoordinates.y - canvasRect.top
      };
    }