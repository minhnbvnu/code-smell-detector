function statsLocal2Remote(stats) {
	    return {
	        type: SpecialArgType.STATS,
	        statsData: bufferToTransferrableObject(stats.toBuffer())
	    };
	}