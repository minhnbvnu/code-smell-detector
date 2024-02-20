function eventPullRequestVoteStarted(pr) {
                // Tweet vote started
                postTweet('Vote started for PR #' + pr.number + ': ' + pr.html_url);
            }