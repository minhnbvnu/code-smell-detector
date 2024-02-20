function ScrollingToolbar () {
      var makeGroup = function (gSpec) {
        var scrollClass = gSpec.scrollable === true ? '${prefix}-toolbar-scrollable-group' : '';
        return {
          dom: dom$1('<div aria-label="' + gSpec.label + '" class="${prefix}-toolbar-group ' + scrollClass + '"></div>'),
          tgroupBehaviours: derive$1([config('adhoc-scrollable-toolbar', gSpec.scrollable === true ? [runOnInit(function (component, _simulatedEvent) {
                set$3(component.element(), 'overflow-x', 'auto');
                markAsHorizontal(component.element());
                register(component.element());
              })] : [])]),
          components: [Container.sketch({ components: [ToolbarGroup.parts().items({})] })],
          markers: { itemSelector: '.' + resolve('toolbar-group-item') },
          items: gSpec.items
        };
      };
      var toolbar = build$1(Toolbar.sketch({
        dom: dom$1('<div class="${prefix}-toolbar"></div>'),
        components: [Toolbar.parts().groups({})],
        toolbarBehaviours: derive$1([
          Toggling.config({
            toggleClass: resolve('context-toolbar'),
            toggleOnExecute: false,
            aria: { mode: 'none' }
          }),
          Keying.config({ mode: 'cyclic' })
        ]),
        shell: true
      }));
      var wrapper = build$1(Container.sketch({
        dom: { classes: [resolve('toolstrip')] },
        components: [premade$1(toolbar)],
        containerBehaviours: derive$1([Toggling.config({
            toggleClass: resolve('android-selection-context-toolbar'),
            toggleOnExecute: false
          })])
      }));
      var resetGroups = function () {
        Toolbar.setGroups(toolbar, initGroups.get());
        Toggling.off(toolbar);
      };
      var initGroups = Cell([]);
      var setGroups = function (gs) {
        initGroups.set(gs);
        resetGroups();
      };
      var createGroups = function (gs) {
        return map$1(gs, compose(ToolbarGroup.sketch, makeGroup));
      };
      var refresh = function () {
      };
      var setContextToolbar = function (gs) {
        Toggling.on(toolbar);
        Toolbar.setGroups(toolbar, gs);
      };
      var restoreToolbar = function () {
        if (Toggling.isOn(toolbar)) {
          resetGroups();
        }
      };
      var focus = function () {
        Keying.focusIn(toolbar);
      };
      return {
        wrapper: constant(wrapper),
        toolbar: constant(toolbar),
        createGroups: createGroups,
        setGroups: setGroups,
        setContextToolbar: setContextToolbar,
        restoreToolbar: restoreToolbar,
        refresh: refresh,
        focus: focus
      };
    }