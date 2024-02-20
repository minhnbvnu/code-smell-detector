function eventPullRequestMerged(event) {
                var pr = event.pull_request;
                // Tweet PR merged
                postTweet('I now have the ability to: ' + pr.title + ' ' + pr.html_url);
            }