function parseActions(actions, context) {
  return actions.map(function (action) {
    if (!action) {
      return null;
    }

    if (Array.isArray(action)) {
      var subActions = parseActions(action, context);
      return {
        name: 'ActionGroup',
        fn: function fn() {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          var scope = args.pop();
          return doAction(subActions, context, scope, args);
        }
      };
    }

    var t = __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_typeof___default()(action);

    if (t === 'function') {
      return {
        name: 'anonymous',
        fn: action
      };
    } // recore-loader not support yet


    if (t === 'string' && typeof context[action] === 'function') {
      if (action in context) {
        return {
          name: action,
          fn: context[action].bind(context)
        };
      }

      return null;
    } // recore-loader not support yet


    if (action.name && typeof context[action.name] === 'function') {
      return {
        name: action.name,
        fn: context[action.name].bind(context),
        params: action.params
      };
    }

    return null;
  }).filter(Boolean);
}