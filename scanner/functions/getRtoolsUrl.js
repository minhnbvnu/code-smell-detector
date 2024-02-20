function getRtoolsUrl(version) {
    if (version == "43") {
        return "https://github.com/r-hub/rtools43/releases/download/latest/rtools43.exe";
    }
    else if (version == "42") {
        return "https://github.com/r-hub/rtools42/releases/download/latest/rtools42.exe";
    }
    else if (version == "40") {
        return "https://cran.rstudio.com/bin/windows/Rtools/rtools40-x86_64.exe";
    }
    else {
        return `https://cran.rstudio.com/bin/windows/Rtools/Rtools${version}.exe`;
    }
}