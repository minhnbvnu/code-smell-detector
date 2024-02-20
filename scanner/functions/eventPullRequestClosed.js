function eventPullRequestClosed(event) {
                var pr = event.pull_request;

                // Closed event fires for both merged and rejected scenarios, so
                // we must exit if the vote was successful and PR merged.
                if (pr.merged_at) { return; }

                // Tweet PR closed
                postTweet('PR #' + pr.number + ' has been closed: ' + pr.html_url);
            }