function associateRelatedInfo(info) {
                    Debug.assert(!!errorInfo);
                    if (!relatedInfo) {
                        relatedInfo = [info];
                    }
                    else {
                        relatedInfo.push(info);
                    }
                }