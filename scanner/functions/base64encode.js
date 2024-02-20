function base64encode(host, input) {
            if (host && host.base64encode) {
                return host.base64encode(input);
            }
            return convertToBase64(input);
        }