function buildCredentialScope(datetime, region, service) {
        return datetime.substr(0, 8) + '/' + region + '/' + service + '/' + AWS4_REQUEST
    }