function mxConnectionHandler(a,b){mxEventSource.call(this);null!=a&&(this.graph=a,this.factoryMethod=b,this.init(),this.escapeHandler=mxUtils.bind(this,function(a,b){this.reset()}),this.graph.addListener(mxEvent.ESCAPE,this.escapeHandler))}