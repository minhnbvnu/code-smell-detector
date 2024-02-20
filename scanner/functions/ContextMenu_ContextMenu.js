function ContextMenu_ContextMenu({
  children,
  id
}) {
  const {
    hideMenu,
    registerMenu
  } = Object(react["useContext"])(RegistryContext);
  const [state, setState] = Object(react["useState"])(HIDDEN_STATE);
  const bodyAccessorRef = Object(react["useRef"])(null);
  const containerRef = Object(react["useRef"])(null);
  const menuRef = Object(react["useRef"])(null);
  Object(react["useEffect"])(() => {
    const element = bodyAccessorRef.current;

    if (element !== null) {
      const ownerDocument = element.ownerDocument;
      containerRef.current = ownerDocument.querySelector('[data-react-devtools-portal-root]');

      if (containerRef.current == null) {
        console.warn('DevTools tooltip root node not found; context menus will be disabled.');
      }
    }
  }, []);
  Object(react["useEffect"])(() => {
    const showMenuFn = ({
      data,
      pageX,
      pageY
    }) => {
      setState({
        data,
        isVisible: true,
        pageX,
        pageY
      });
    };

    const hideMenuFn = () => setState(HIDDEN_STATE);

    return registerMenu(id, showMenuFn, hideMenuFn);
  }, [id]);
  Object(react["useLayoutEffect"])(() => {
    if (!state.isVisible) {
      return;
    }

    const menu = menuRef.current;
    const container = containerRef.current;

    if (container !== null) {
      // $FlowFixMe[missing-local-annot]
      const hideUnlessContains = event => {
        if (!menu.contains(event.target)) {
          hideMenu();
        }
      };

      const ownerDocument = container.ownerDocument;
      ownerDocument.addEventListener('mousedown', hideUnlessContains);
      ownerDocument.addEventListener('touchstart', hideUnlessContains);
      ownerDocument.addEventListener('keydown', hideUnlessContains);
      const ownerWindow = ownerDocument.defaultView;
      ownerWindow.addEventListener('resize', hideMenu);
      repositionToFit(menu, state.pageX, state.pageY);
      return () => {
        ownerDocument.removeEventListener('mousedown', hideUnlessContains);
        ownerDocument.removeEventListener('touchstart', hideUnlessContains);
        ownerDocument.removeEventListener('keydown', hideUnlessContains);
        ownerWindow.removeEventListener('resize', hideMenu);
      };
    }
  }, [state]);

  if (!state.isVisible) {
    return /*#__PURE__*/react["createElement"]("div", {
      ref: bodyAccessorRef
    });
  } else {
    const container = containerRef.current;

    if (container !== null) {
      return /*#__PURE__*/Object(react_dom["createPortal"])( /*#__PURE__*/react["createElement"]("div", {
        ref: menuRef,
        className: ContextMenu_default.a.ContextMenu
      }, children(state.data)), container);
    } else {
      return null;
    }
  }
}