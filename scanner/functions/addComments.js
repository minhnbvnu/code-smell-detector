function addComments(pr, positive, negative) {
        var i;
        for (i = 0; i < positive; i++) {
          pr.comments.push({
            user: { login: 'positive' + i },
            body: ':+1:',
            id: 1,
          });
        }
        for (i = 0; i < negative; i++) {
          pr.comments.push({
            user: { login: 'negative' + i },
            body: ':-1:',
            id: 1,
          });
        }
      }