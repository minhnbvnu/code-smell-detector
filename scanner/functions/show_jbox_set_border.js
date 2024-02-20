function show_jbox_set_border(val) {
    $.jBox.setDefaults({ defaults: { border: val} }); // 只修改全局 border
    $.jBox.info('边框已设置为 ' + val);
}