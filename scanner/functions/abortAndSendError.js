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