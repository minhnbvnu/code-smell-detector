function apiErrorRemote2Local(e) {
	    return ApiError.fromBuffer(transferrableObjectToBuffer(e.errorData));
	}