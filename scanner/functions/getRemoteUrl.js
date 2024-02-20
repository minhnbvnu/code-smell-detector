function getRemoteUrl(path) {
    const pkgPath = Path.join(path, 'package.json');
    const pkgExist = fs.existsSync(pkgPath);
    const { gren = '' } = pkgExist ? require(pkgPath) : {};
    return gren;
}