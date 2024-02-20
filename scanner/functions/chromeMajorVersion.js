function chromeMajorVersion(userAgent) {
            const chromeVersionPart = userAgent.match(/Chrome\/(.*?)\./);
            if (chromeVersionPart) {
                return parseInt(chromeVersionPart[1]);
            }

            return null;
        }