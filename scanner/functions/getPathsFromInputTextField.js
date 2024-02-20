function getPathsFromInputTextField() {
        var pathsString = $('#ingestPath').val()
        if (pathsString.length !== 0) {
            if (pathsString[0] === '[') // indicator that it might be multiselect (JSON)
            {
                try {
                    var pathsArray = $.parseJSON(pathsString);
                    return pathsArray;
                } catch (e) {
                    alert("syntax error:" + e.message);
                }
            } else {
                return pathsString;
            }
        }
        return "" //no paths found
    }