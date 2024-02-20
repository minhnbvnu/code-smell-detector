function popup(url, name, width, height, options)
    {
        var x = (screen.width - width) / 2,
            y = (screen.height - height) / 2
            ;

        options +=	', left=' + x +
            ', top=' + y +
            ', width=' + width +
            ', height=' + height
        ;
        options = options.replace(/^,/, '');

        var win = window.open(url, name, options);
        win.focus();
        return win;
    }