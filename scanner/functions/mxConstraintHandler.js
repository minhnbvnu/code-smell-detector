function mxConstraintHandler(a){this.graph=a;this.resetHandler=mxUtils.bind(this,function(a,c){null!=this.currentFocus&&null==this.graph.view.getState(this.currentFocus.cell)?this.reset():this.redraw()});this.graph.model.addListener(mxEvent.CHANGE,this.resetHandler);this.graph.view.addListener(mxEvent.SCALE_AND_TRANSLATE,this.resetHandler);this.graph.view.addListener(mxEvent.TRANSLATE,this.resetHandler);this.graph.view.addListener(mxEvent.SCALE,this.resetHandler);this.graph.addListener(mxEvent.ROOT,
this.resetHandler)}