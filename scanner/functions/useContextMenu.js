function useContextMenu({
  data,
  id,
  onChange,
  ref
}) {
  const {
    showMenu
  } = Object(react["useContext"])(RegistryContext);
  Object(react["useEffect"])(() => {
    if (ref.current !== null) {
      const handleContextMenu = event => {
        event.preventDefault();
        event.stopPropagation();
        const pageX = event.pageX || event.touches && event.touches[0].pageX;
        const pageY = event.pageY || event.touches && event.touches[0].pageY;
        showMenu({
          data,
          id,
          onChange,
          pageX,
          pageY
        });
      };

      const trigger = ref.current;
      trigger.addEventListener('contextmenu', handleContextMenu);
      return () => {
        trigger.removeEventListener('contextmenu', handleContextMenu);
      };
    }
  }, [data, id, showMenu]);
}