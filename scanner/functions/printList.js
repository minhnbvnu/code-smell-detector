function printList(format, nodes, sourceFile) {
                writeList(format, nodes, sourceFile, beginPrint());
                return endPrint();
            }