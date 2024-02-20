function genVar(filename) {
    const hash = createHash(SHA);
    hash.update(filename);
    return 'cov_' + parseInt(hash.digest('hex').substr(0, 12), 16).toString(36);
}