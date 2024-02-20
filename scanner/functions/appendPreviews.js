function appendPreviews(files, idx) {
            idx = idx || 0;
            if (idx >= files.length) {
                return;
            }
            var reader = self.getFileReader(files[idx], function(text) {
                if (text) {
                    self.onAppendPreview(text);
                }
                appendPreviews(files, idx + 1);
            });

            if (reader) {
                reader();
            } else {
                return notSupported("FileReader API not present");
            }
        }