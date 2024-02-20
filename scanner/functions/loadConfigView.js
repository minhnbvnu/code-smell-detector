function loadConfigView() {
    chrome.storage.local.get(['studySubjectConfig'], function (result) {
        let studySubjectConfig = result.studySubjectConfig
        var html = "";
        for (var i = 0; i < studySubjectConfig.length; i++) {
            html += getViewDetail(studySubjectConfig[i]);
        }
        $(html).appendTo("#configListTable");
    });
}