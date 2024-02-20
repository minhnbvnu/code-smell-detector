function getUserConfig () {

    var form = document.forms[ 'data-form' ],
        info = {
            title: form[ 'title' ].value,
            subTitle: form[ 'sub-title' ].value,
            xTitle: form[ 'x-title' ].value,
            yTitle: form[ 'y-title' ].value,
            suffix: form[ 'unit' ].value,
            //数据对齐方式
            tableDataFormat: getTableDataFormat (),
            //饼图提示文字
            tip: $( "#tipInput" ).val()
        };

    return info;

}