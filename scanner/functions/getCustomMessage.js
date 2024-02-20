function getCustomMessage(bannedType) {
        if (bannedType == null) {
            return '';
        }
        if (typeof bannedType === 'string') {
            return ` ${bannedType}`;
        }
        if (bannedType.message) {
            return ` ${bannedType.message}`;
        }
        return '';
    }