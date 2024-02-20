function writeUnparsedNode(unparsed) {
                writer.rawWrite(unparsed.parent.text.substring(unparsed.pos, unparsed.end));
            }