function renderAndExit() {
        page.render(opts.file);
        phantom.exit();
    }