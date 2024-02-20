function clearVirtualField(name, fields, fieldsMeta) {
	  if (fieldsMeta[name] && fieldsMeta[name].virtual) {
	    /* eslint no-loop-func:0 */
	    Object.keys(fields).forEach(function (ok) {
	      if (getNameIfNested(ok).name === name) {
	        delete fields[ok];
	      }
	    });
	  }
	}