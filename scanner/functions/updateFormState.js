function updateFormState (radio, color, url, align, x, y) {
        var nocolorRadio = $G('nocolorRadio'),
            coloredRadio = $G('coloredRadio');

        if(radio) {
            nocolorRadio.checked = (radio == 'colored' ? false:'checked');
            coloredRadio.checked = (radio == 'colored' ? 'checked':false);
        }
        if(color) {
            domUtils.setStyle($G("colorPicker"), "background-color", color);
        }

        if(url && /^\//.test(url)) {
            var a = document.createElement('a');
            a.href = url;
            browser.ie && (a.href = a.href);
            url = browser.ie ? a.href:(a.protocol + '//' + a.host + a.pathname + a.search + a.hash);
        }

        if(url || url === '') {
            $G('url').value = url;
        }
        if(align) {
            utils.each($G('repeatType').children, function(item){
                item.selected = (align == item.getAttribute('value') ? 'selected':false);
            });
        }
        if(x || y) {
            $G('x').value = parseInt(x) || 0;
            $G('y').value = parseInt(y) || 0;
        }

        $G('alignment').style.display = coloredRadio.checked && $G('url').value ? '':'none';
        $G('custom').style.display = coloredRadio.checked && $G('url').value && $G('repeatType').value == 'self' ? '':'none';
    }