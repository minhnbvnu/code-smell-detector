function addName(name) {
                enter();
                if (!nameToNameIndexMap)
                    nameToNameIndexMap = /* @__PURE__ */ new Map();
                let nameIndex = nameToNameIndexMap.get(name);
                if (nameIndex === void 0) {
                    nameIndex = names.length;
                    names.push(name);
                    nameToNameIndexMap.set(name, nameIndex);
                }
                exit();
                return nameIndex;
            }