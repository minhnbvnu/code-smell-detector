function printUnescapedNode(hint, node, sourceFile) {
                escapes = void 0;
                writer.clear();
                printer.writeNode(hint, node, sourceFile, writer);
                return writer.getText();
            }