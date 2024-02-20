function setHookTitle(hook) {
	      hook.originalTitle = hook.originalTitle || hook.title;

	      if (hook.ctx && hook.ctx.currentTest) {
	        hook.title = "".concat(hook.originalTitle, " for \"").concat(hook.ctx.currentTest.title, "\"");
	      } else {
	        var parentTitle;

	        if (hook.parent.title) {
	          parentTitle = hook.parent.title;
	        } else {
	          parentTitle = hook.parent.root ? '{root}' : '';
	        }

	        hook.title = "".concat(hook.originalTitle, " in \"").concat(parentTitle, "\"");
	      }
	    }