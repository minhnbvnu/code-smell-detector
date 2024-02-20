function nonEscapingWrite(s) {
                if (writer.nonEscapingWrite) {
                    writer.nonEscapingWrite(s);
                }
                else {
                    writer.write(s);
                }
            }