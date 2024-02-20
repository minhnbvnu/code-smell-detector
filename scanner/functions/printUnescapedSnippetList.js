function printUnescapedSnippetList(format, list, sourceFile) {
                escapes = void 0;
                writer.clear();
                printer.writeList(format, list, sourceFile, writer);
                return writer.getText();
            }