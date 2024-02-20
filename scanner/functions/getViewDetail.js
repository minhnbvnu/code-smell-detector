function getViewDetail(obj) {
    var html = "";
    html += '<tr class="tableRow config_' + obj.type + '" attr="' + obj.type + '" title="' + obj.title + '">';

    html += '<td><select class="' + obj.type + '_sort">';
    var sortArr = [1, 2, 3, 4];
    for (var i = 0; i < sortArr.length; i++) {
        if (obj.sort == sortArr[i]) {
            html += '<option value="' + sortArr[i] + '" selected>' + sortArr[i] + '</option> ';
        } else {
            html += '<option value="' + sortArr[i] + '">' + sortArr[i] + '</option> ';
        }
    }
    html += '</select></td>';

    html += '<td style="text-align: center">' + obj.title + '</td>';

    html += '<td><select class="' + obj.type + '_flag">';
    var flagArr = [{ "key": "自动学习", "value": true }, { "key": "不学习", "value": false }];
    for (var i = 0; i < flagArr.length; i++) {
        if (obj.flag === flagArr[i].value) {
            html += '<option value=' + flagArr[i].value + ' selected>' + flagArr[i].key + '</option> ';
        } else {
            html += '<option value=' + flagArr[i].value + '>' + flagArr[i].key + '</option> ';
        }
    }
    html += '</select></td>';

    html += '<td>';
    if (obj.type == "article" || obj.type == "video") {
        html += '<select class="' + obj.type + '_time">';

        var flagArr = [{ "key": "1分钟", "value": "60" }, { "key": "2分钟", "value": "120" }, { "key": "3分钟", "value": "180" }];
        for (var i = 0; i < flagArr.length; i++) {
            if (obj.time == flagArr[i].value) {
                html += '<option value="' + flagArr[i].value + '" selected>' + flagArr[i].key + '</option> ';
            } else {
                html += '<option value="' + flagArr[i].value + '">' + flagArr[i].key + '</option> ';
            }
        }

        html += '</select>';
    }

    html += '</td>';

    html += '<td>';
    if (obj.type == "week" || obj.type == "paper") {
        html += '<select class="' + obj.type + '_subject">';

        var flagArr = [{ "key": "优先本年度题目", "value": "current" }, { "key": "优先历史题目", "value": "history" }];
        for (var i = 0; i < flagArr.length; i++) {
            if (obj.subject == flagArr[i].value) {
                html += '<option value="' + flagArr[i].value + '" selected>' + flagArr[i].key + '</option> ';
            } else {
                html += '<option value="' + flagArr[i].value + '">' + flagArr[i].key + '</option> ';
            }
        }

        html += '</select>';
    }

    html += '</td>';

    html += '</tr>';
    return html;
}