function handleNewSignature(oldSignatureFormat, newSignature) {
                        const oldSignature = !oldSignatureFormat || isString(oldSignatureFormat) ? oldSignatureFormat : oldSignatureFormat[0];
                        newSignature != null ? newSignature : newSignature = computeSignature(text, host, data);
                        if (newSignature === oldSignature) {
                            if (oldSignatureFormat === oldSignature)
                                return void 0;
                            else if (data)
                                data.differsOnlyInMap = true;
                            else
                                data = { differsOnlyInMap: true };
                        }
                        else {
                            state.hasChangedEmitSignature = true;
                            state.latestChangedDtsFile = fileName;
                        }
                        return newSignature;
                    }