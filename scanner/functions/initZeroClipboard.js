function initZeroClipboard() {

        ZeroClipboard.config({
            debug: false,
            swfPath: me.options.UEDITOR_HOME_URL + 'third-party/zeroclipboard/ZeroClipboard.swf'
        });

        var client = me.zeroclipboard = new ZeroClipboard();

        // 复制内容
        client.on('copy', function (e) {
            var client = e.client,
                rng = me.selection.getRange(),
                div = document.createElement('div');

            div.appendChild(rng.cloneContents());
            client.setText(div.innerText || div.textContent);
            client.setHtml(div.innerHTML);
            rng.select();
        });
        // hover事件传递到target
        client.on('mouseover mouseout', function (e) {
            var target = e.target;
            if (e.type == 'mouseover') {
                domUtils.addClass(target, 'edui-state-hover');
            } else if (e.type == 'mouseout') {
                domUtils.removeClasses(target, 'edui-state-hover');
            }
        });
        // flash加载不成功
        client.on('wrongflash noflash', function () {
            ZeroClipboard.destroy();
        });
    }