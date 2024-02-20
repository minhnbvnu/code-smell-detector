function applyNewPrLabels(repo, prLabels, pr) {
                gh.issues.edit({
                    user: repo.user,
                    repo: repo.repo,
                    number: pr.number,
                    labels: prLabels
                }, noop);
            }