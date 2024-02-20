function usePromiseValueOrNull(propValue) {
  const [value, setValue] = Object(react["useState"])(null);
  Object(react["useEffect"])(() => {
    let disposed = false;
    propValue.then(resolvedValue => {
      if (disposed) {
        return;
      }

      setValue(resolvedValue);
    });
    return () => {
      disposed = true;
    };
  }, [propValue]);
  return value;
}