function logout_main() {
        var page_instance = new page.Page('div#header', 'div#site');
        page_instance.show();

        IPython.page = page_instance;
    }