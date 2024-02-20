function getGlobalDir() {
	  if (!globalDir) {
	    this.initGlobalDir();
	  }
	  !globalDir ?  true ? invariant(false, 'Global direction not set.') : invariant(false) : void 0;
	  return globalDir;
	}