function demo_5_3() {
    $.jBox.messager("Hello jBox 3", "my title", 3000, {
        width: 350,
        icon: 'info',
        showType: 'show',
        buttons: { '去看看': true },
        submit: function (v, h, f) {
            $.jBox.info('看个蛋蛋？');
            return true;
        }
    });
}