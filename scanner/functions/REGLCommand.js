function REGLCommand(args, body) {
                    var i;
                    if (contextLost) {
                        check$1.raise('context lost');
                    }
                    if (typeof args === 'function') {
                        return scope.call(this, null, args, 0);
                    }
                    else if (typeof body === 'function') {
                        if (typeof args === 'number') {
                            for (i = 0; i < args; ++i) {
                                scope.call(this, null, body, i);
                            }
                        }
                        else if (Array.isArray(args)) {
                            for (i = 0; i < args.length; ++i) {
                                scope.call(this, args[i], body, i);
                            }
                        }
                        else {
                            return scope.call(this, args, body, 0);
                        }
                    }
                    else if (typeof args === 'number') {
                        if (args > 0) {
                            return batch.call(this, reserve(args | 0), args | 0);
                        }
                    }
                    else if (Array.isArray(args)) {
                        if (args.length) {
                            return batch.call(this, args, args.length);
                        }
                    }
                    else {
                        return draw.call(this, args);
                    }
                }