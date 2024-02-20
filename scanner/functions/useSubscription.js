function useSubscription({
  getCurrentValue,
  subscribe
}) {
  const [state, setState] = Object(react["useState"])(() => ({
    getCurrentValue,
    subscribe,
    value: getCurrentValue()
  }));

  if (state.getCurrentValue !== getCurrentValue || state.subscribe !== subscribe) {
    setState({
      getCurrentValue,
      subscribe,
      value: getCurrentValue()
    });
  }

  Object(react["useEffect"])(() => {
    let didUnsubscribe = false;

    const checkForUpdates = () => {
      if (didUnsubscribe) {
        return;
      }

      setState(prevState => {
        if (prevState.getCurrentValue !== getCurrentValue || prevState.subscribe !== subscribe) {
          return prevState;
        }

        const value = getCurrentValue();

        if (prevState.value === value) {
          return prevState;
        }

        return { ...prevState,
          value
        };
      });
    };

    const unsubscribe = subscribe(checkForUpdates);
    checkForUpdates();
    return () => {
      didUnsubscribe = true;
      unsubscribe();
    };
  }, [getCurrentValue, subscribe]);
  return state.value;
}