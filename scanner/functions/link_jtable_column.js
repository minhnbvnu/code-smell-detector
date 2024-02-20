function link_jtable_column (data, column, baseurl, campbase) {
    var coltext = "";
    if (typeof data.record[column] == "string") {
        var items = data.record[column].split('|||');
        for (var i = 0; i < items.length; i++) {
            if (column == "campaign" && items[i]) {
                var campurl = campbase.replace("__CAMPAIGN__", items[i]);
                /*jshint multistr: true */
                coltext += '<span style="float: left;"> \
                               <a href="'+baseurl+'?'+column+'='+encodeURIComponent(items[i])+'">'+items[i]+'</a> \
                            </span> \
                            <span style="float: top;"> \
                                <a href="'+campurl+'" class="ui-icon ui-icon-triangle-1-e"></a> \
                            </span>';
            } else {
                var decoded = $('<div/>').html(items[i]).text();
                coltext += '<a href="'+baseurl+'?'+column+'='+encodeURIComponent(decoded)+'&force_full=1">'+items[i]+'</a>';
                if (i !== (items.length - 1)) {
                    coltext += ', ';
                }
            }
        }
    } else {
        coltext = '<a href="'+baseurl+'?'+column+'='+encodeURIComponent(data.record[column])+'">'+data.record[column]+'</a>';
    }
    return coltext;
}