function defineConvert(fromRegexp, toStr) {
    return filePath => filePath.replace(fromRegexp, toStr)
}