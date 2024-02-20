function _buildMessage($status) {
            var booktype = win.booktype;
            var msg = [booktype._('status_remove_confirmation')];
            var numChapters = $status.data('num-chapters');
            var numAttachments = $status.data('num-attachments');

            //add chapters warning if any
            if (numChapters > 0) {
              var _bold = _.sprintf("<b>%s</b>", numChapters)
              msg.push(_.sprintf(booktype._('status_remove__chapters'), { num_chapters: _bold }));
            }

            if (numChapters > 0 && numAttachments > 0)
              msg.push(booktype._('status_remove__and'));

            //add attachments warning if any
            if (numAttachments > 0) {
              var _bold = _.sprintf("<b>%s</b>", numAttachments)
              msg.push(_.sprintf(booktype._('status_remove__attachments'), { num_attachments: _bold }));
            }

            //if more than one element in array means chapters or attachments
            if (msg.length > 1)
              msg.push(booktype._('status_remove__suffix'));

            return msg.join(" ");
          }