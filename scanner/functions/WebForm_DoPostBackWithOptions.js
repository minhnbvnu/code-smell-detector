function WebForm_DoPostBackWithOptions(options) {
    var validationResult = true;
    if (options.validation) {
        if (typeof(Page_ClientValidate) == 'function') {
            validationResult = Page_ClientValidate(options.validationGroup);
        }
    }
    if (validationResult) {
        if ((typeof(options.actionUrl) != "undefined") && (options.actionUrl != null) && (options.actionUrl.length > 0)) {
            theForm.action = options.actionUrl;
        }
        if (options.trackFocus) {
            var lastFocus = theForm.elements["__LASTFOCUS"];
            if ((typeof(lastFocus) != "undefined") && (lastFocus != null)) {
                if (typeof(document.activeElement) == "undefined") {
                    lastFocus.value = options.eventTarget;
                }
                else {
                    var active = document.activeElement;
                    if ((typeof(active) != "undefined") && (active != null)) {
                        if ((typeof(active.id) != "undefined") && (active.id != null) && (active.id.length > 0)) {
                            lastFocus.value = active.id;
                        }
                        else if (typeof(active.name) != "undefined") {
                            lastFocus.value = active.name;
                        }
                    }
                }
            }
        }
    }
    if (options.clientSubmit) {
        __doPostBack(options.eventTarget, options.eventArgument);
    }
}