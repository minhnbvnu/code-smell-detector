function getDBNameRandom () {
    return dbPrefix + new Date().getTime() + Math.random() + dbSuffix;
}