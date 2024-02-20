function setSuperCalled() {
                const segments = funcInfo.codePath.currentSegments;
                for (let i = 0; i < segments.length; ++i) {
                    const segment = segments[i];
                    if (segment.reachable) {
                        segInfoMap[segment.id].superCalled = true;
                    }
                }
            }