function useCanvasInteraction(canvasRef, interactor) {
  const isMouseDownRef = Object(react["useRef"])(false);
  const didMouseMoveWhileDownRef = Object(react["useRef"])(false);
  Object(react["useEffect"])(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    function localToCanvasCoordinates(localCoordinates) {
      // $FlowFixMe[incompatible-call] found when upgrading Flow
      const canvasRect = cacheFirstGetCanvasBoundingRect(canvas);
      return {
        x: localCoordinates.x - canvasRect.left,
        y: localCoordinates.y - canvasRect.top
      };
    }

    const onCanvasClick = event => {
      if (didMouseMoveWhileDownRef.current) {
        return;
      }

      interactor({
        type: 'click',
        payload: {
          event,
          location: localToCanvasCoordinates({
            x: event.x,
            y: event.y
          })
        }
      });
    };

    const onCanvasDoubleClick = event => {
      if (didMouseMoveWhileDownRef.current) {
        return;
      }

      interactor({
        type: 'double-click',
        payload: {
          event,
          location: localToCanvasCoordinates({
            x: event.x,
            y: event.y
          })
        }
      });
    };

    const onCanvasMouseDown = event => {
      didMouseMoveWhileDownRef.current = false;
      isMouseDownRef.current = true;
      interactor({
        type: 'mousedown',
        payload: {
          event,
          location: localToCanvasCoordinates({
            x: event.x,
            y: event.y
          })
        }
      });
    };

    const onDocumentMouseMove = event => {
      if (isMouseDownRef.current) {
        didMouseMoveWhileDownRef.current = true;
      }

      interactor({
        type: 'mousemove',
        payload: {
          event,
          location: localToCanvasCoordinates({
            x: event.x,
            y: event.y
          })
        }
      });
    };

    const onDocumentMouseUp = event => {
      isMouseDownRef.current = false;
      interactor({
        type: 'mouseup',
        payload: {
          event,
          location: localToCanvasCoordinates({
            x: event.x,
            y: event.y
          })
        }
      });
    };

    const onCanvasWheel = event => {
      event.preventDefault();
      event.stopPropagation();
      const location = localToCanvasCoordinates({
        x: event.x,
        y: event.y
      });
      const delta = normalizeWheel(event);

      if (event.shiftKey) {
        interactor({
          type: 'wheel-shift',
          payload: {
            event,
            location,
            delta
          }
        });
      } else if (event.ctrlKey) {
        interactor({
          type: 'wheel-control',
          payload: {
            event,
            location,
            delta
          }
        });
      } else if (event.metaKey) {
        interactor({
          type: 'wheel-meta',
          payload: {
            event,
            location,
            delta
          }
        });
      } else {
        interactor({
          type: 'wheel-plain',
          payload: {
            event,
            location,
            delta
          }
        });
      }

      return false;
    };

    const ownerDocument = canvas.ownerDocument;
    ownerDocument.addEventListener('mousemove', onDocumentMouseMove);
    ownerDocument.addEventListener('mouseup', onDocumentMouseUp);
    canvas.addEventListener('click', onCanvasClick);
    canvas.addEventListener('dblclick', onCanvasDoubleClick);
    canvas.addEventListener('mousedown', onCanvasMouseDown);
    canvas.addEventListener('wheel', onCanvasWheel);
    return () => {
      ownerDocument.removeEventListener('mousemove', onDocumentMouseMove);
      ownerDocument.removeEventListener('mouseup', onDocumentMouseUp);
      canvas.removeEventListener('click', onCanvasClick);
      canvas.removeEventListener('dblclick', onCanvasDoubleClick);
      canvas.removeEventListener('mousedown', onCanvasMouseDown);
      canvas.removeEventListener('wheel', onCanvasWheel);
    };
  }, [canvasRef, interactor]);
}