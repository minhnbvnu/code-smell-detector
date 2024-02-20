function checkOptions(fsType, opts, cb) {
	    var optsInfo = fsType.Options;
	    var fsName = fsType.Name;
	    var pendingValidators = 0;
	    var callbackCalled = false;
	    var loopEnded = false;
	    function validatorCallback(e) {
	        if (!callbackCalled) {
	            if (e) {
	                callbackCalled = true;
	                cb(e);
	            }
	            pendingValidators--;
	            if (pendingValidators === 0 && loopEnded) {
	                cb();
	            }
	        }
	    }
	    // Check for required options.
	    var loop = function ( optName ) {
	        if (optsInfo.hasOwnProperty(optName)) {
	            var opt = optsInfo[optName];
	            var providedValue = opts[optName];
	            if (providedValue === undefined || providedValue === null) {
	                if (!opt.optional) {
	                    // Required option, not provided.
	                    // Any incorrect options provided? Which ones are close to the provided one?
	                    // (edit distance 5 === close)
	                    var incorrectOptions = Object.keys(opts).filter(function (o) { return !(o in optsInfo); }).map(function (a) {
	                        return { str: a, distance: levenshtein(optName, a) };
	                    }).filter(function (o) { return o.distance < 5; }).sort(function (a, b) { return a.distance - b.distance; });
	                    // Validators may be synchronous.
	                    if (callbackCalled) {
	                        return {};
	                    }
	                    callbackCalled = true;
	                    return { v: cb(new ApiError(ErrorCode.EINVAL, ("[" + fsName + "] Required option '" + optName + "' not provided." + (incorrectOptions.length > 0 ? (" You provided unrecognized option '" + (incorrectOptions[0].str) + "'; perhaps you meant to type '" + optName + "'.") : '') + "\nOption description: " + (opt.description)))) };
	                }
	                // Else: Optional option, not provided. That is OK.
	            }
	            else {
	                // Option provided! Check type.
	                var typeMatches = false;
	                if (Array.isArray(opt.type)) {
	                    typeMatches = opt.type.indexOf(typeof (providedValue)) !== -1;
	                }
	                else {
	                    typeMatches = typeof (providedValue) === opt.type;
	                }
	                if (!typeMatches) {
	                    // Validators may be synchronous.
	                    if (callbackCalled) {
	                        return {};
	                    }
	                    callbackCalled = true;
	                    return { v: cb(new ApiError(ErrorCode.EINVAL, ("[" + fsName + "] Value provided for option " + optName + " is not the proper type. Expected " + (Array.isArray(opt.type) ? ("one of {" + (opt.type.join(", ")) + "}") : opt.type) + ", but received " + (typeof (providedValue)) + "\nOption description: " + (opt.description)))) };
	                }
	                else if (opt.validator) {
	                    pendingValidators++;
	                    opt.validator(providedValue, validatorCallback);
	                }
	                // Otherwise: All good!
	            }
	        }
	    };
	
	    for (var optName in optsInfo) {
	        var returned = loop( optName );
	
	        if ( returned ) return returned.v;
	    }
	    loopEnded = true;
	    if (pendingValidators === 0 && !callbackCalled) {
	        cb();
	    }
	}