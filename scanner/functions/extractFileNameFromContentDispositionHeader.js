function extractFileNameFromContentDispositionHeader(value) {
                var responseFilename = /filename="([^;]*);?"/i.exec(value);
                if (responseFilename === null) {
                    responseFilename = /filename=([^;]*);?/i.exec(value)
                }
                if (responseFilename !== null && responseFilename.length > 1) {
                    return responseFilename[1]
                }
                return null
            }