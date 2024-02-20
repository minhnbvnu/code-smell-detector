function ValidatorOnLoad() {
    if (typeof(Page_Validators) == "undefined")
        return;
    var i, val;
    for (i = 0; i < Page_Validators.length; i++) {
        val = Page_Validators[i];
        if (typeof(val.evaluationfunction) == "string") {
            eval("val.evaluationfunction = " + val.evaluationfunction + ";");
        }
        if (typeof(val.isvalid) == "string") {
            if (val.isvalid == "False") {
                val.isvalid = false;
                Page_IsValid = false;
            }
            else {
                val.isvalid = true;
            }
        } else {
            val.isvalid = true;
        }
        if (typeof(val.enabled) == "string") {
            val.enabled = (val.enabled != "False");
        }
        if (typeof(val.controltovalidate) == "string") {
            ValidatorHookupControlID(val.controltovalidate, val);
        }
        if (typeof(val.controlhookup) == "string") {
            ValidatorHookupControlID(val.controlhookup, val);
        }
    }
    Page_ValidationActive = true;
}