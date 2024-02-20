function addNewlyScannedDirectives() {
                            if (addedNewlyScannedDirectives)
                                return;
                            addedNewlyScannedDirectives = true;
                            if (!commentDirectives) {
                                commentDirectives = newDirectives;
                            }
                            else if (newDirectives) {
                                commentDirectives.push(...newDirectives);
                            }
                        }