function useLocation() {
  const [{ pathname, search }, setLocation] = useState(getCurrentLocation());

  /** All components using the 'useLocation' hook will update. */
  function notify() {
    listeners.forEach(listener => listener());
  }

  function handleChange() {
    setLocation(getCurrentLocation());
  }

  useEffect(() => {
    listeners.push(handleChange);
    window.addEventListener('popstate', handleChange);
    return () => {
      listeners.splice(listeners.indexOf(handleChange), 1);
      window.removeEventListener('popstate', handleChange);
    };
  }, []);

  function push(url) {
    window.history.pushState(null, null, url);
    notify();
  }

  function replace(url) {
    window.history.replaceState(null, null, url);
    notify();
  }

  return {
    push,
    replace,
    pathname,
    search,
  };
}