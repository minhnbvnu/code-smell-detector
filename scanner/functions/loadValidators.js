function loadValidators() {
            if (typeof (ValidatorOnLoad) === "function") {
                ValidatorOnLoad();
            }
            if (typeof (ValidatorOnSubmit) === "undefined") {
                window.ValidatorOnSubmit = function () {
                    return Page_ValidationActive ? ValidatorCommonOnSubmit() : true;
                };
            }
        }