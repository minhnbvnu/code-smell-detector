function _renderToDOM() {
  _renderToDOM = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref4, domElement) {
    var storyContext, unboundStoryFn, showMain, showException, forceRemount, Story, content, element;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            storyContext = _ref4.storyContext, unboundStoryFn = _ref4.unboundStoryFn, showMain = _ref4.showMain, showException = _ref4.showException, forceRemount = _ref4.forceRemount;
            Story = unboundStoryFn;
            content = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(ErrorBoundary, {
              showMain: showMain,
              showException: showException
            }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(Story, storyContext)); // For React 15, StrictMode & Fragment doesn't exists.

            element = Wrapper ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(Wrapper, null, content) : content; // In most cases, we need to unmount the existing set of components in the DOM node.
            // Otherwise, React may not recreate instances for every story run.
            // This could leads to issues like below:
            // https://github.com/storybookjs/react-storybook/issues/81
            // (This is not the case when we change args or globals to the story however)

            if (forceRemount) {
              unmountElement(domElement);
            }

            _context3.next = 7;
            return renderElement(element, domElement);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _renderToDOM.apply(this, arguments);
}