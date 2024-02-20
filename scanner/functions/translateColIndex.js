function translateColIndex(col){
      return Handsontable.PluginHooks.execute(instance, 'modifyCol', col); // warning: this must be done after datamap.colToProp
    }