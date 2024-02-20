function getNewLineOrDefaultFromHost(host, formatSettings) {
            var _a2;
            return (formatSettings == null ? void 0 : formatSettings.newLineCharacter) || ((_a2 = host.getNewLine) == null ? void 0 : _a2.call(host)) || lineFeed2;
        }