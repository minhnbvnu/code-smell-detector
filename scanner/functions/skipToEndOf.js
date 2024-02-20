function skipToEndOf(node) {
                scanner2.setTextPos(node.end);
                savedPos = scanner2.getStartPos();
                lastScanAction = void 0;
                lastTokenInfo = void 0;
                wasNewLine = false;
                leadingTrivia = void 0;
                trailingTrivia = void 0;
            }