function growListenerTree(type,listener){type=typeof type==="string"?type.split(this.delimiter):type.slice();for(var i=0,len=type.length;i+1<len;i++){if(type[i]==="**"&&type[i+1]==="**"){return}}var tree=this.listenerTree;var name=type.shift();while(name){if(!tree[name]){tree[name]={}}tree=tree[name];if(type.length===0){if(!tree._listeners){tree._listeners=listener}else if(typeof tree._listeners==="function"){tree._listeners=[tree._listeners,listener]}else if(isArray(tree._listeners)){tree._listeners.push(listener);if(!tree._listeners.warned){var m=defaultMaxListeners;if(typeof this._events.maxListeners!=="undefined"){m=this._events.maxListeners}if(m>0&&tree._listeners.length>m){tree._listeners.warned=true;console.error("(node) warning: possible EventEmitter memory "+"leak detected. %d listeners added. "+"Use emitter.setMaxListeners() to increase limit.",tree._listeners.length);console.trace()}}}return true}name=type.shift()}return true}