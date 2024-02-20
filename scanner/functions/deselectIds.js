function deselectIds() {
        if ((twitter > 0)) {
            setTimeout(function () {
                $("#twitter-tab-preview").addClass(" active");
            }, 50);
        } else if (facebook > 0) {
            setTimeout(function () {
                $("#facebook-tab-preview").addClass(" active");
            }, 50);
        } else if (linkedin > 0) {
            setTimeout(function () {
                $("#linkedin-tab-preview").addClass(" active");
            }, 50);
        } else if (instagram > 0) {
            setTimeout(function () {
                $("#instagram-tab-preview").addClass(" active");
            }, 50);
        }
    }