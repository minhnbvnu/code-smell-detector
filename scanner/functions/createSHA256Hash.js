function createSHA256Hash(data) {
                            const hash = _crypto.createHash("sha256");
                            hash.update(data);
                            return hash.digest("hex");
                        }