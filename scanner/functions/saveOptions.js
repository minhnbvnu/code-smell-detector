function saveOptions() {
    var config = [];
    $(".tableRow").each(function () {

        var type = $(this).attr("attr");
        var item = new Object();
        item.type = type;
        item.title = $(this).attr("title");
        var flag = $("select." + type + "_flag :selected").val();
        if (flag == "true") {
            item.flag = true;
        } else {
            item.flag = false;
        }
        item.sort = $("select." + type + "_sort :selected").val();
        var time = $("select." + type + "_time :selected").val();
        if (typeof (time) == "undefined") {
            item.time = 0;
        } else {
            item.time = time;
        }
        var subject = $("select." + type + "_subject :selected").val();
        if (typeof (subject) == "undefined") {
            item.subject = "";
        } else {
            item.subject = subject;
        }
        config.push(item);
    });

    config.sort(function (a, b) {
        return a.sort - b.sort;
    });

    // 保存数据
    chrome.storage.local.set({ studySubjectConfig: config }, function () {
        location.reload();
    });
}