function panel_showhide_callback (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var head = $(evt.currentTarget);
        var body = head.next();
        var show = !body.is(':visible');
        head.find('i.fa').first()
            .toggleClass('fa-caret-down', show)
            .toggleClass('fa-caret-right', !show);
        body
            .slideToggle({show: show, duration: 200});
    }