function accessPrivateIdentifier2(name) {
                const info = accessPrivateIdentifier(lexicalEnvironment, name);
                return (info == null ? void 0 : info.kind) === "untransformed" ? void 0 : info;
            }