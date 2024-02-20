function useStepper({
  step,
  dragging
}) {
  const [stepping, setStepping] = react["useState"](true);
  react["useEffect"](() => {
    if (stepping === false) {
      return;
    }

    const stepHandle = setInterval(step, 220);
    return () => clearInterval(stepHandle);
  }, [step, stepping]);
  react["useEffect"](() => {
    if (dragging) {
      setStepping(false);
      return;
    }

    const steppingTimeout = window.setTimeout(() => {
      setStepping(true);
    }, 1000);
    return () => {
      window.clearTimeout(steppingTimeout);
    };
  }, [dragging]);
}