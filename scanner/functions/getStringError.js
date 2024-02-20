function getStringError(errors) {
                let error = errors[0].messageText;
                if (typeof error !== "string") {
                    error = error.messageText;
                }
                return error;
            }