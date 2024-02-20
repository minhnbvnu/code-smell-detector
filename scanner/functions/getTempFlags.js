function getTempFlags(formattedNameKey) {
                var _a2;
                switch (formattedNameKey) {
                    case "":
                        return tempFlags;
                    case "#":
                        return privateNameTempFlags;
                    default:
                        return (_a2 = formattedNameTempFlags == null ? void 0 : formattedNameTempFlags.get(formattedNameKey)) != null ? _a2 : 0 /* Auto */;
                }
            }