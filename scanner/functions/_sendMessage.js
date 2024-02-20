function _sendMessage() {
            var msg = jquery.trim(jquery('.notification-writer').val());

            if (msg !== '') {
              if (jquery('.notification-writer').hasClass('important')) {
                $this.showMessage(win.booktype.username, msg, win.booktype.email, true, new Date().toLocaleString());
              } else {
                $this.showMessage(win.booktype.username, msg, win.booktype.email, false, new Date().toLocaleString());
              }

              jquery('.tab-content.chat').removeClass('typing-active');
              var important = jquery('.notification-writer').hasClass('important');
              jquery('.notification-writer').val('').removeClass('important');

              win.booktype.sendToChannel('/chat/' + win.booktype.currentBookID + '/', {
                  'command': 'message_send',
                  'message': msg,
                  'important': important
                },
                function () {
                }
              );
            }
          }