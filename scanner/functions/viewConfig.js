function viewConfig(name) {
    var height = name == 'defaults' ? 500 : 'auto';
    jBox.open('id:' + name, '$.jBox.' + name, 'auto', height, { top: '50px', loaded: function () {
        $('.jbox-content').css('background-color', '#eeeeee').find('pre').css('border', 'none')
    }
    });
}