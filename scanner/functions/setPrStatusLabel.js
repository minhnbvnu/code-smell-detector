function setPrStatusLabel(repo, label, pr) {
                console.info('DEBUG: Getting labels on issue', {
                    user: repo.user,
                    repo: repo.repo,
                    number: pr.number
                });
                // Fetch the issue labels for this pull request
                gh.issues.getIssueLabels({
                    user: repo.user,
                    repo: repo.repo,
                    number: pr.number
                }, function (err, prLabels) {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    // Sanity check for label we are trying to set:
                    if (containsLabel(label, prLabels)) {
                        // Label is already on the PR, nothing to do.
                        return;
                    }

                    // Remove any status labels that are not what we want to apply to the PR
                    if (label.name === VOTING_UNDERWAY) {
                        prLabels = removeUnwantedLabels([
                            getStatusLabel(VOTING_MERGED),
                            getStatusLabel(VOTING_REJECTED)
                        ], prLabels);
                    } else if (label.name === VOTING_REJECTED) {
                        prLabels = removeUnwantedLabels([
                            getStatusLabel(VOTING_MERGED),
                            getStatusLabel(VOTING_UNDERWAY)
                        ], prLabels);
                    } else if (label.name === VOTING_MERGED) {
                        prLabels = removeUnwantedLabels([
                            getStatusLabel(VOTING_REJECTED),
                            getStatusLabel(VOTING_UNDERWAY)
                        ], prLabels);
                    }

                    // Add the status label that we want
                    prLabels.push(label);

                    applyNewPrLabels(repo, prLabels, pr);
                });
            }