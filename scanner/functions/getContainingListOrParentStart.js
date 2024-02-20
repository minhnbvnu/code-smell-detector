function getContainingListOrParentStart(parent2, child, sourceFile) {
                        const containingList = getContainingList(child, sourceFile);
                        const startPos = containingList ? containingList.pos : parent2.getStart(sourceFile);
                        return sourceFile.getLineAndCharacterOfPosition(startPos);
                    }