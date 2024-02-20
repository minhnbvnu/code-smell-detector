function untrackFiberID(fiber) {
    if (constants["F" /* __DEBUG__ */]) {
      debug('untrackFiberID()', fiber, fiber.return, 'schedule after delay');
    } // Untrack Fibers after a slight delay in order to support a Fast Refresh edge case:
    // 1. Component type is updated and Fast Refresh schedules an update+remount.
    // 2. flushPendingErrorsAndWarningsAfterDelay() runs, sees the old Fiber is no longer mounted
    //    (it's been disconnected by Fast Refresh), and calls untrackFiberID() to clear it from the Map.
    // 3. React flushes pending passive effects before it runs the next render,
    //    which logs an error or warning, which causes a new ID to be generated for this Fiber.
    // 4. DevTools now tries to unmount the old Component with the new ID.
    //
    // The underlying problem here is the premature clearing of the Fiber ID,
    // but DevTools has no way to detect that a given Fiber has been scheduled for Fast Refresh.
    // (The "_debugNeedsRemount" flag won't necessarily be set.)
    //
    // The best we can do is to delay untracking by a small amount,
    // and give React time to process the Fast Refresh delay.


    untrackFibersSet.add(fiber); // React may detach alternate pointers during unmount;
    // Since our untracking code is async, we should explicily track the pending alternate here as well.

    const alternate = fiber.alternate;

    if (alternate !== null) {
      untrackFibersSet.add(alternate);
    }

    if (untrackFibersTimeoutID === null) {
      untrackFibersTimeoutID = setTimeout(untrackFibers, 1000);
    }
  }