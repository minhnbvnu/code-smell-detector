function showAlerts(messages, kind) {
        var container = $('#info-' + kind);
        var ul = container.find('ul');

        for (var i = 0; i < messages.length; i++) {
          var li = $(document.createElement('li'));
          li.text(messages[i]).appendTo(ul);
        }

        container.removeClass('hidden');
      }