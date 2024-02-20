function findWidget(column, index){
      var widget = null;
      for (var i=0; i<column.widgets.length; i++){
        var w = column.widgets[i];
        if (dashboard.idEquals(w.wid,index)){
          widget = w;
          break;
        }
      }
      return widget;
    }