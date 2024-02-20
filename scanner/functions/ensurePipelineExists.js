function ensurePipelineExists(config) {
    const branch = config.branch || 'master';

    const shouldNotDeletePipeline = config.shouldNotDeletePipeline || false;

    return (
        this.getJwt(this.apiToken)
            .then(response => {
                this.jwt = response.body.token;

                return this.createPipeline(config.repoName, branch, config.rootDir);
            })
            .then(response => {
                Assert.strictEqual(response.statusCode, 201);

                this.pipelineId = response.body.id;

                return this.getPipeline(this.pipelineId);
            })
            .catch(err => {
                const [, str] = err.message.split(': ');

                [this.pipelineId] = str.match(ID);

                if (!shouldNotDeletePipeline) {
                    // If pipeline already exists, deletes and re-creates
                    return this.deletePipeline(this.pipelineId).then(resDel => {
                        Assert.equal(resDel.statusCode, 204);

                        return this.createPipeline(config.repoName, branch, config.rootDir).then(resCre => {
                            Assert.equal(resCre.statusCode, 201);

                            this.pipelineId = resCre.body.id;

                            return this.getPipeline(this.pipelineId);
                        });
                    });
                }

                return this.getPipeline(this.pipelineId);
            })
            /* eslint-disable complexity */
            .then(response => {
                Assert.equal(response.statusCode, 200);

                this.jobs = response.body;

                if (config.table) {
                    const expectedJobs = config.table.hashes();

                    for (let i = 0; i < expectedJobs.length; i += 1) {
                        const job = this.jobs.find(j => j.name === expectedJobs[i].job);

                        Assert.ok(job, 'Given job does not exist on pipeline');

                        const requiresList = expectedJobs[i].requires.split(/\s*,\s*/);
                        const { requires } = job.permutations[0];

                        for (let j = 0; j < requiresList.length; j += 1) {
                            if (requiresList[j].includes(':')) {
                                Assert.ok(
                                    requires.some(r =>
                                        r.split(':') ? r.split(':')[1] === requiresList[j].split(':')[1] : null
                                    ),
                                    'pipeline should have specific external edges'
                                );
                            } else {
                                Assert.ok(requires.includes(requiresList[j]), 'pipeline should have specific edges');
                            }
                        }
                    }
                }

                if (config.jobName) {
                    Assert.ok(this.jobs.some(j => j.name === config.jobName));
                }

                for (let i = 0; i < this.jobs.length; i += 1) {
                    const job = this.jobs[i];

                    switch (job.name) {
                        case 'publish': // for event test
                        case 'second': // for metadata and secret tests
                            this.secondJobId = job.id;
                            break;
                        case 'third':
                            this.thirdJobId = job.id;
                            break;
                        case 'success_A':
                            this.success_AJobId = job.id;
                            break;
                        case 'fail_A':
                            this.fail_AJobId = job.id;
                            break;
                        case 'success_B':
                            this.success_BJobId = job.id;
                            break;
                        case 'fail_B':
                            this.fail_BJobId = job.id;
                            break;
                        case 'parallel_A':
                            this.parallel_AJobId = job.id;
                            break;
                        case 'parallel_B1':
                            this.parallel_B1JobId = job.id;
                            break;
                        case 'parallel_B2':
                            this.parallel_B2JobId = job.id;
                            break;
                        default:
                            // main job
                            this.jobId = job.id;
                    }
                }

                return response;
                /* eslint-enable complexity */
            })
    );
}