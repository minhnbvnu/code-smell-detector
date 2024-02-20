function isNativeDate(input) {
    return Object.prototype.toString.call(input) === '[object Date]' || input instanceof Date;
}