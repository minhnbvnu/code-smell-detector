function login_main() {
      var page_instance = new page.Page('div#header', 'div#site');
      page_instance.show();
      $('input#password_input').focus();
      IPython.page = page_instance;
    }