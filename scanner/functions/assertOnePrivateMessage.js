function assertOnePrivateMessage(done) {
        var msgs = mock.getIncomingMsgs();
        var matchingMessages = msgs.filter(function (line) {
          return (line.indexOf('PRIVMSG ' + config.irc.channel) !== -1);
        });
        if (matchingMessages.length === 1) {
          done();
        } else if (matchingMessages.length > 1) {
          assert.ifError('Too many messages sent');
        }
        assert.ifError('Message not sent');
      }