function didStatefulHookChange(prev, next) {
    const prevMemoizedState = prev.memoizedState;
    const nextMemoizedState = next.memoizedState;

    if (isHookThatCanScheduleUpdate(prev)) {
      return prevMemoizedState !== nextMemoizedState;
    }

    return false;
  }