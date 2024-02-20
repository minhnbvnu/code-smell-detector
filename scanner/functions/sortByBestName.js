function sortByBestName(a, b) {
                            const specifierA = parentSpecifiers[a];
                            const specifierB = parentSpecifiers[b];
                            if (specifierA && specifierB) {
                                const isBRelative = pathIsRelative(specifierB);
                                if (pathIsRelative(specifierA) === isBRelative) {
                                    return countPathComponents(specifierA) - countPathComponents(specifierB);
                                }
                                if (isBRelative) {
                                    return -1;
                                }
                                return 1;
                            }
                            return 0;
                        }