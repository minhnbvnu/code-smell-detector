function useRefLike(name, initialValue) {
  return useMemoLike(name, function () {
    return {
      current: initialValue
    };
  }, []);
}