function md5sum(filePath) {
    const hash = crypto.createHash("md5");
    const data = fs.readFileSync(filePath);
    hash.update(data, "utf8");
    return hash.digest("hex");
}