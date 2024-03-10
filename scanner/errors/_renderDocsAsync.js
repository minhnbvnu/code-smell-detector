    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            docs = story.parameters.docs;

            if (!((docs !== null && docs !== void 0 && docs.getPage || docs !== null && docs !== void 0 && docs.page) && !(docs !== null && docs !== void 0 && docs.getContainer || docs !== null && docs !== void 0 && docs.container))) {
              _context.next = 3;
              break;
            }

            throw new Error('No `docs.container` set, did you run `addon-docs/preset`?');

          case 3:
            _context.t1 = docs.container;

            if (_context.t1) {
              _context.next = 8;
              break;
            }

            _context.next = 7;
            return (_docs$getContainer = docs.getContainer) === null || _docs$getContainer === void 0 ? void 0 : _docs$getContainer.call(docs);

          case 7:
            _context.t1 = _context.sent;

          case 8:
            _context.t0 = _context.t1;

            if (_context.t0) {
              _context.next = 11;
              break;
            }

            _context.t0 = function (_ref) {
              var children = _ref.children;
              return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, children);
            };

          case 11:
            DocsContainer = _context.t0;
            _context.t3 = docs.page;

            if (_context.t3) {
              _context.next = 17;
              break;
            }

            _context.next = 16;
            return (_docs$getPage = docs.getPage) === null || _docs$getPage === void 0 ? void 0 : _docs$getPage.call(docs);

          case 16:
            _context.t3 = _context.sent;

          case 17:
            _context.t2 = _context.t3;

            if (_context.t2) {
              _context.next = 20;
              break;
            }

            _context.t2 = _NoDocs__WEBPACK_IMPORTED_MODULE_5__[/* NoDocs */ "a"];

          case 20:
            Page = _context.t2;
            // Use `componentId` as a key so that we force a re-render every time
            // we switch components
            docsElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(DocsContainer, {
              key: story.componentId,
              context: docsContext
            }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Page, null));
            _context.next = 24;
            return new Promise(function (resolve) {
              react_dom__WEBPACK_IMPORTED_MODULE_4___default.a.render(docsElement, element, resolve);
            });

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);