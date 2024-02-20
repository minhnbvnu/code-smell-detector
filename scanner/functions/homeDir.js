function homeDir() {
	if ((process.env.HOME === undefined) && (process.env.HOMEDRIVE === undefined) && (process.env.USERPROFILE === undefined)) return null;
	return process.env.HOME || (process.env.HOMEDRIVE != null && process.env.HOMEPATH != null && (process.env.HOMEDRIVE + process.env.HOMEPATH)) || process.env.USERPROFILE;
}