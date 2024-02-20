function argRemote2Local(arg, fixedRequestArgs) {
	            if (!arg) {
	                return arg;
	            }
	            switch (typeof arg) {
	                case 'object':
	                    if (typeof arg['type'] === 'number') {
	                        var specialArg = arg;
	                        switch (specialArg.type) {
	                            case SpecialArgType.CB:
	                                var cbId = arg.id;
	                                return function () {
	                                    var arguments$1 = arguments;
	
	                                    var i;
	                                    var fixedArgs = new Array(arguments.length);
	                                    var message, countdown = arguments.length;
	                                    function abortAndSendError(err) {
	                                        if (countdown > 0) {
	                                            countdown = -1;
	                                            message = {
	                                                browserfsMessage: true,
	                                                cbId: cbId,
	                                                args: [apiErrorLocal2Remote(err)]
	                                            };
	                                            worker.postMessage(message);
	                                        }
	                                    }
	                                    for (i = 0; i < arguments.length; i++) {
	                                        // Capture i and argument.
	                                        (function (i, arg) {
	                                            argLocal2Remote(arg, fixedRequestArgs, function (err, fixedArg) {
	                                                fixedArgs[i] = fixedArg;
	                                                if (err) {
	                                                    abortAndSendError(err);
	                                                }
	                                                else if (--countdown === 0) {
	                                                    message = {
	                                                        browserfsMessage: true,
	                                                        cbId: cbId,
	                                                        args: fixedArgs
	                                                    };
	                                                    worker.postMessage(message);
	                                                }
	                                            });
	                                        })(i, arguments$1[i]);
	                                    }
	                                    if (arguments.length === 0) {
	                                        message = {
	                                            browserfsMessage: true,
	                                            cbId: cbId,
	                                            args: fixedArgs
	                                        };
	                                        worker.postMessage(message);
	                                    }
	                                };
	                            case SpecialArgType.API_ERROR:
	                                return apiErrorRemote2Local(specialArg);
	                            case SpecialArgType.STATS:
	                                return statsRemote2Local(specialArg);
	                            case SpecialArgType.FILEFLAG:
	                                return fileFlagRemote2Local(specialArg);
	                            case SpecialArgType.BUFFER:
	                                return bufferRemote2Local(specialArg);
	                            case SpecialArgType.ERROR:
	                                return errorRemote2Local(specialArg);
	                            default:
	                                // No idea what this is.
	                                return arg;
	                        }
	                    }
	                    else {
	                        return arg;
	                    }
	                default:
	                    return arg;
	            }
	        }