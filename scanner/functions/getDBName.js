function getDBName () {
    return dbPrefix + new Date().getTime() + dbSuffix;
}