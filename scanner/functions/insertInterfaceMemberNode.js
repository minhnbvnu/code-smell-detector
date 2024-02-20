function insertInterfaceMemberNode(sourceFile2, cls, newElement) {
                if (constructor) {
                    changeTracker.insertNodeAfter(sourceFile2, constructor, newElement);
                }
                else {
                    changeTracker.insertMemberAtStart(sourceFile2, cls, newElement);
                }
            }