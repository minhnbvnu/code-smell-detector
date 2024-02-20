function sri(filename) {
    const code = fs.readFileSync(filename);
    return sriToolbox.generate({}, code);
}