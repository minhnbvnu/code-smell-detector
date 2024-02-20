function chromeVersion(userAgent) {
            const chromeVersionPart = userAgent.match(/Chrome\/(.*?) /);
            if (chromeVersionPart) {
                return chromeVersionPart[1];
            }

            return null;
        }