function AutoMatch(txtObj) {
    if (txtObj.value.length > 0) {
        $.fn.zTree.init($("#javatree"), setting, AllNotes);
        fuzzySearch('javatree','#keyword',null,true); //初始化模糊搜索方法
    }else {
        $.fn.zTree.init($("#javatree"), setting, AllNotes);
    }
}