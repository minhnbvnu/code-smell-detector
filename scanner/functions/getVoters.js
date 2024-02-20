function getVoters(pr) {
        return pr.comments.map(function (comment) {
          return comment.user.login;
        });
      }