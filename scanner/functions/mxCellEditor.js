function mxCellEditor(a){this.graph=a;this.zoomHandler=mxUtils.bind(this,function(){this.graph.isEditing()&&this.resize()});this.graph.view.addListener(mxEvent.SCALE,this.zoomHandler);this.graph.view.addListener(mxEvent.SCALE_AND_TRANSLATE,this.zoomHandler);this.changeHandler=mxUtils.bind(this,function(a){null!=this.editingCell&&(a=this.graph.getView().getState(this.editingCell),null==a?this.stopEditing(!0):this.updateTextAreaStyle(a))});this.graph.getModel().addListener(mxEvent.CHANGE,this.changeHandler)}