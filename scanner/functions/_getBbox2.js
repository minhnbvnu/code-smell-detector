function _getBbox2(){var t,r=1/0,a=-1/0,o=1/0,l=-1/0,c=_createForOfIteratorHelper(this.paths);try{for(c.s();!(t=c.n()).done;){var u,d=_createForOfIteratorHelper(t.value);try{for(d.s();!(u=d.n()).done;){var h=_slicedToArray(u.value,4),p=h[0],v=h[1],y=h[2],g=h[3],_=i.Util.bezierBoundingBox.apply(i.Util,_toConsumableArray(p).concat(_toConsumableArray(v),_toConsumableArray(y),_toConsumableArray(g)));r=Math.min(r,_[0]);o=Math.min(o,_[1]);a=Math.max(a,_[2]);l=Math.max(l,_[3])}}catch(t){d.e(t)}finally{d.f()}}}catch(t){c.e(t)}finally{c.f()}return[r,o,a,l]}