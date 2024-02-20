function tableClickHander( evt ) {

        removeSelectedClass(domUtils.getElementsByTagName(me.body, "td th"));
        //trace:3113
        //选中单元格，点击table外部，不会清掉table上挂的ueTable,会引起getUETableBySelected方法返回值
        utils.each(me.document.getElementsByTagName('table'), function (t) {
            t.ueTable = null;
        });
        startTd = getTargetTd(me, evt);
        if( !startTd ) return;
        var table = domUtils.findParentByTagName(startTd, "table", true);
        ut = getUETable(table);
        ut && ut.clearSelected();

        //判断当前鼠标状态
        if (!onBorder) {
            me.document.body.style.webkitUserSelect = '';
            mousedown = true;
            me.addListener('mouseover', mouseOverEvent);
        } else {
            //边框上的动作处理
            borderActionHandler( evt );
        }


    }