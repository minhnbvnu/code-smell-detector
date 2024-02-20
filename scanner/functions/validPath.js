function validPath(path) {
        if (!(path && path.length !== 0)) {
            alert("Please enter a valid path");
            return false;
        } else {
            return true;
        }
    }