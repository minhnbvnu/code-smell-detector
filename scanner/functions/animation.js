function animation(prefixCls) {
	  return {
	    enter: function enter(node, done) {
	      return animate(node, true, prefixCls + '-anim', done);
	    },
	    leave: function leave(node, done) {
	      return animate(node, false, prefixCls + '-anim', done);
	    }
	  };
	}