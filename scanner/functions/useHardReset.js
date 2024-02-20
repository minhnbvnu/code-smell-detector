function useHardReset() {
  return () => {
    window.localStorage.setItem("hard-reset", "1");
    reload();
  };
}