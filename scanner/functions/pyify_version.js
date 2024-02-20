function pyify_version(version) {
        return version.replace(/-(dev|rc)\./, ".$1");
    }