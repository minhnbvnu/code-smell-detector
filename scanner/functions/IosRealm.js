function IosRealm (scrollIntoView) {
      var alloy = OuterContainer({ classes: [resolve('ios-container')] });
      var toolbar = ScrollingToolbar();
      var webapp = api$2();
      var switchToEdit = makeEditSwitch(webapp);
      var socket = makeSocket();
      var dropup = build$2(function () {
        webapp.run(function (w) {
          w.refreshStructure();
        });
      }, scrollIntoView);
      alloy.add(toolbar.wrapper());
      alloy.add(socket);
      alloy.add(dropup.component());
      var setToolbarGroups = function (rawGroups) {
        var groups = toolbar.createGroups(rawGroups);
        toolbar.setGroups(groups);
      };
      var setContextToolbar = function (rawGroups) {
        var groups = toolbar.createGroups(rawGroups);
        toolbar.setContextToolbar(groups);
      };
      var focusToolbar = function () {
        toolbar.focus();
      };
      var restoreToolbar = function () {
        toolbar.restoreToolbar();
      };
      var init = function (spec) {
        webapp.set(produce$1(spec));
      };
      var exit = function () {
        webapp.run(function (w) {
          Replacing.remove(socket, switchToEdit);
          w.exit();
        });
      };
      var updateMode$1 = function (readOnly) {
        updateMode(socket, switchToEdit, readOnly, alloy.root());
      };
      return {
        system: constant(alloy),
        element: alloy.element,
        init: init,
        exit: exit,
        setToolbarGroups: setToolbarGroups,
        setContextToolbar: setContextToolbar,
        focusToolbar: focusToolbar,
        restoreToolbar: restoreToolbar,
        updateMode: updateMode$1,
        socket: constant(socket),
        dropup: constant(dropup)
      };
    }