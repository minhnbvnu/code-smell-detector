function commitPendingTrailingSemicolon() {
                if (pendingTrailingSemicolon) {
                    writer.writeTrailingSemicolon(";");
                    pendingTrailingSemicolon = false;
                }
            }