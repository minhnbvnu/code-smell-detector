function fileFlagLocal2Remote(flag) {
	    return {
	        type: SpecialArgType.FILEFLAG,
	        flagStr: flag.getFlagString()
	    };
	}