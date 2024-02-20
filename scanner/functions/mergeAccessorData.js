function mergeAccessorData(accessors, accessorData) {
                const equalKeyElement = accessors.find(a => areEqualKeys(a.key, accessorData.key));
                if (equalKeyElement) {
                    equalKeyElement.getters.push(...accessorData.getters);
                    equalKeyElement.setters.push(...accessorData.setters);
                }
                else {
                    accessors.push(accessorData);
                }
                return accessors;
            }