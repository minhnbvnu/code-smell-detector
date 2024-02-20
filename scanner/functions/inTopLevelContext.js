function inTopLevelContext() {
                return !inContext(1 /* NonTopLevel */);
            }