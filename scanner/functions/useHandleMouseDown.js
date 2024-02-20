function useHandleMouseDown(propsWindows) {
  const windowsInfo = useTypedSelector(getWindowsInfo);
  const getWindowHidden = useTypedSelector(selectors_getWindowHidden);
  const browserWindowSize = useTypedSelector(getBrowserWindowSize);
  const updateWindowPositions = useActionCreator(windows_updateWindowPositions);
  const [draggingState, setDraggingState] = Object(react["useState"])(null); // When the mouse is down, attach a listener to track mouse move events.

  Object(react["useEffect"])(() => {
    if (draggingState == null) {
      return;
    }

    const {
      boundingBox,
      moving,
      stationary,
      mouseStart
    } = draggingState;

    const handleMouseMove = ee => {
      const proposedDiff = {
        x: getX(ee) - mouseStart.x,
        y: getY(ee) - mouseStart.y
      };
      const proposedWindows = moving.map(node => WindowManager_objectSpread(WindowManager_objectSpread({}, node), applyDiff(node, proposedDiff)));

      const proposedBox = WindowManager_objectSpread(WindowManager_objectSpread({}, boundingBox), applyDiff(boundingBox, proposedDiff));

      const snapDiff = snapDiffManyToMany(proposedWindows, stationary);
      const withinDiff = snapWithinDiff(proposedBox, browserWindowSize);
      const finalDiff = applyMultipleDiffs(proposedDiff, snapDiff, withinDiff);
      const windowPositionDiff = {};
      moving.forEach(w => {
        windowPositionDiff[w.key] = applyDiff(w, finalDiff);
      });
      updateWindowPositions(windowPositionDiff, false);
    };

    function handleMouseUp() {
      setDraggingState(null);
    }

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove, {
      passive: false
    });
    window.addEventListener("touchmove", handleMouseMove, {
      passive: false
    });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [browserWindowSize, draggingState, updateWindowPositions]); // Mouse down handler

  return Object(react["useCallback"])((key, e) => {
    if (!e.target.classList.contains("draggable")) {
      return;
    }

    const x = getX(e);
    const y = getY(e);

    if (getWindowHidden(key)) {
      // The user may be clicking on full screen Milkdrop.
      return;
    }

    const windows = windowsInfo.filter(w => propsWindows[w.key] != null && !getWindowHidden(w.key));
    const targetNode = windows.find(node => node.key === key);

    if (targetNode == null) {
      throw new Error(`Tried to move a node that does not exist: ${key}`);
    }

    let movingSet = new Set([targetNode]); // Only the main window brings other windows along.

    if (key === "main") {
      const findAllConnected = traceConnection(abuts);
      movingSet = findAllConnected(windows, targetNode);
    }

    const stationary = windows.filter(w => !movingSet.has(w));
    const moving = Array.from(movingSet);
    const mouseStart = {
      x,
      y
    };
    const boundingBox = snapUtils_boundingBox(moving);
    setDraggingState({
      boundingBox,
      moving,
      stationary,
      mouseStart
    });
  }, [getWindowHidden, propsWindows, windowsInfo]);
}