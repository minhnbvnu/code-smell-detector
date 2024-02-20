function defaultStatusCode(responses) {
                var codes = responses.keySeq();
                return codes.contains(DEFAULT_RESPONSE_KEY) ? DEFAULT_RESPONSE_KEY : codes.filter(function(key) {
                    return (key + "")[0] === "2"
                }).sort().first()
            }