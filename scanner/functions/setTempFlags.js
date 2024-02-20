function setTempFlags(formattedNameKey, flags) {
                switch (formattedNameKey) {
                    case "":
                        tempFlags = flags;
                        break;
                    case "#":
                        privateNameTempFlags = flags;
                        break;
                    default:
                        formattedNameTempFlags != null ? formattedNameTempFlags : formattedNameTempFlags = /* @__PURE__ */ new Map();
                        formattedNameTempFlags.set(formattedNameKey, flags);
                        break;
                }
            }