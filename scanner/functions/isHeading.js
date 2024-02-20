function isHeading(row) {
            token = session.getTokens(row)[0];
            return token && token.type.lastIndexOf(heading, 0) === 0;
        }