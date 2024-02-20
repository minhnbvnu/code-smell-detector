function buildStringToSign(datetime, credentialScope, hashedCanonicalRequest) {
        return AWS_SHA_256 + '\n' +
            datetime + '\n' +
            credentialScope + '\n' +
            hashedCanonicalRequest;
    }