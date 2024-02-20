function Css({
  children,
  id
}) {
  const style = Object(react["useMemo"])(() => {
    const s = document.createElement("style");
    s.type = "text/css";
    s.id = id;
    return s;
  }, [id]);
  Object(react["useLayoutEffect"])(() => {
    document.head.appendChild(style);
    return () => style.remove();
  }, [style]);
  return Object(react_dom["createPortal"])(children, style);
}