function l8e(e,t){return r=>{for(let n=Bn(r.state).resolveInner(r.pos,-1);n;n=n.parent){if(e.indexOf(n.name)>-1)return null;if(n.type.isTop)break}return t(r)}}