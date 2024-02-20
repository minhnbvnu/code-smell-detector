function renderColorSwatchItem(spec, backstage) {
      var items = getColors$1(backstage.colorinput.getColors(), backstage.colorinput.hasCustomColors());
      var columns = backstage.colorinput.getColorCols();
      var presets = 'color';
      var menuSpec = createPartialChoiceMenu(generate$1('menu-value'), items, function (value) {
        spec.onAction({ value: value });
      }, columns, presets, ItemResponse$1.CLOSE_ON_EXECUTE, function () {
        return false;
      }, backstage.shared.providers);
      var widgetSpec = __assign(__assign({}, menuSpec), {
        markers: markers$1(presets),
        movement: deriveMenuMovement(columns, presets)
      });
      return {
        type: 'widget',
        data: { value: generate$1('widget-id') },
        dom: {
          tag: 'div',
          classes: ['tox-fancymenuitem']
        },
        autofocus: true,
        components: [parts$2().widget(Menu.sketch(widgetSpec))]
      };
    }