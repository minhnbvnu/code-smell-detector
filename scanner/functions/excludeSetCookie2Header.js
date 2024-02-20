function excludeSetCookie2Header(header) {
    return !/^Set-Cookie2?$/i.test(header);
}