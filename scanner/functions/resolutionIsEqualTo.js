function resolutionIsEqualTo(oldResolution, newResolution) {
                    if (oldResolution === newResolution) {
                        return true;
                    }
                    if (!oldResolution || !newResolution) {
                        return false;
                    }
                    const oldResult = getResolutionWithResolvedFileName(oldResolution);
                    const newResult = getResolutionWithResolvedFileName(newResolution);
                    if (oldResult === newResult) {
                        return true;
                    }
                    if (!oldResult || !newResult) {
                        return false;
                    }
                    return oldResult.resolvedFileName === newResult.resolvedFileName;
                }