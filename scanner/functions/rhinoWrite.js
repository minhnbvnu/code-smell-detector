function rhinoWrite(path, filename, text) {
                if (path) {
                    // turn filename into a qualified path
                    filename = getQualifiedFilename(java.lang.System.getProperty("file.separator"));
                    // create parent dir and ancestors if necessary
                    var file = java.io.File(filename);
                    var parentDir = file.getParentFile();
                    if (!parentDir.exists()) {
                        parentDir.mkdirs();
                    }
                }
                // finally write the file
                var out = new java.io.BufferedWriter(new java.io.FileWriter(filename));
                out.write(text);
                out.close();
            }