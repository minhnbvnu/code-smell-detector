function ValidationSummaryOnSubmit(validationGroup) {
    if (typeof(Page_ValidationSummaries) == "undefined")
        return;
    var summary, sums, s;
    var headerSep, first, pre, post, end;
    for (sums = 0; sums < Page_ValidationSummaries.length; sums++) {
        summary = Page_ValidationSummaries[sums];
        if (!summary) continue;
        summary.style.display = "none";
        if (!Page_IsValid && IsValidationGroupMatch(summary, validationGroup)) {
            var i;
            if (summary.showsummary != "False") {
                summary.style.display = "";
                if (typeof(summary.displaymode) != "string") {
                    summary.displaymode = "BulletList";
                }
                switch (summary.displaymode) {
                    case "List":
                        headerSep = "<br>";
                        first = "";
                        pre = "";
                        post = "<br>";
                        end = "";
                        break;
                    case "BulletList":
                    default:
                        headerSep = "";
                        first = "<ul>";
                        pre = "<li>";
                        post = "</li>";
                        end = "</ul>";
                        break;
                    case "SingleParagraph":
                        headerSep = " ";
                        first = "";
                        pre = "";
                        post = " ";
                        end = "<br>";
                        break;
                }
                s = "";
                if (typeof(summary.headertext) == "string") {
                    s += summary.headertext + headerSep;
                }
                s += first;
                for (i=0; i<Page_Validators.length; i++) {
                    if (!Page_Validators[i].isvalid && typeof(Page_Validators[i].errormessage) == "string") {
                        s += pre + Page_Validators[i].errormessage + post;
                    }
                }
                s += end;
                summary.innerHTML = s;
                window.scrollTo(0,0);
            }
            if (summary.showmessagebox == "True") {
                s = "";
                if (typeof(summary.headertext) == "string") {
                    s += summary.headertext + "\r\n";
                }
                var lastValIndex = Page_Validators.length - 1;
                for (i=0; i<=lastValIndex; i++) {
                    if (!Page_Validators[i].isvalid && typeof(Page_Validators[i].errormessage) == "string") {
                        switch (summary.displaymode) {
                            case "List":
                                s += Page_Validators[i].errormessage;
                                if (i < lastValIndex) {
                                    s += "\r\n";
                                }
                                break;
                            case "BulletList":
                            default:
                                s += "- " + Page_Validators[i].errormessage;
                                if (i < lastValIndex) {
                                    s += "\r\n";
                                }
                                break;
                            case "SingleParagraph":
                                s += Page_Validators[i].errormessage + " ";
                                break;
                        }
                    }
                }
                alert(s);
            }
        }
    }
}