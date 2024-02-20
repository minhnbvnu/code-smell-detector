function getAdapterFilePath() {
    if (process.argv[2]) {
        return path.join(process.cwd(), process.argv[2]);
    } else {
        throw new Error("Specify your adapter file as an argument.");
    }
}