function getClipboardData(callback) {
        var doc = this.document;
        if (doc.getElementById('baidu_pastebin')) {
            return;
        }
        var range = this.selection.getRange(),
            bk = range.createBookmark(),
        //创建剪贴的容器div
            pastebin = doc.createElement('div');
        pastebin.id = 'baidu_pastebin';
        // Safari 要求div必须有内容，才能粘贴内容进来
        browser.webkit && pastebin.appendChild(doc.createTextNode(domUtils.fillChar + domUtils.fillChar));
        doc.body.appendChild(pastebin);
        //trace:717 隐藏的span不能得到top
        //bk.start.innerHTML = '&nbsp;';
        bk.start.style.display = '';
        pastebin.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;left:-1000px;white-space:nowrap;top:" +
            //要在现在光标平行的位置加入，否则会出现跳动的问题
            domUtils.getXY(bk.start).y + 'px';

        range.selectNodeContents(pastebin).select(true);

        setTimeout(function () {
            if (browser.webkit) {
                for (var i = 0, pastebins = doc.querySelectorAll('#baidu_pastebin'), pi; pi = pastebins[i++];) {
                    if (domUtils.isEmptyNode(pi)) {
                        domUtils.remove(pi);
                    } else {
                        pastebin = pi;
                        break;
                    }
                }
            }
            try {
                pastebin.parentNode.removeChild(pastebin);
            } catch (e) {
            }
            range.moveToBookmark(bk).select(true);
            callback(pastebin);
        }, 0);
    }