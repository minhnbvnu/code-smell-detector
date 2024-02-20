function CustomWorld({ attach, parameters }) {
    this.attach = attach;
    this.parameters = parameters;
    env(path.join(__dirname, '../../.func_config'), { raise: false });
    this.gitToken = process.env.GIT_TOKEN;
    this.apiToken = process.env.SD_API_TOKEN;
    this.protocol = process.env.SD_API_PROTOCOL || 'https';
    this.instance = `${this.protocol}://${process.env.SD_API_HOST}`;
    this.testOrg = process.env.TEST_ORG;
    this.username = process.env.TEST_USERNAME;
    this.scmHostname = process.env.TEST_SCM_HOSTNAME || 'github.com';
    this.scmContext = process.env.TEST_SCM_CONTEXT || 'github';
    this.namespace = 'v4';
    this.promiseToWait = time => promiseToWait(time);
    this.getJwt = apiToken =>
        request({
            method: 'GET',
            url: `${this.instance}/${this.namespace}/auth/token?api_token=${apiToken}`
        });
    this.waitForBuild = buildID =>
        request({
            url: `${this.instance}/${this.namespace}/builds/${buildID}`,
            method: 'GET',
            retry: {
                statusCodes: [200],
                limit: 25,
                calculateDelay: ({ computedValue }) => (computedValue ? 15000 : 0)
            },
            hooks: {
                afterResponse: [buildRetryStrategy]
            },
            context: {
                token: this.jwt
            }
        });
    this.loginWithToken = apiToken =>
        request({
            url: `${this.instance}/${this.namespace}/auth/logout`,
            method: 'POST',
            context: {
                token: this.jwt
            }
            // Actual login is accomplished through getJwt
        }).then(() =>
            this.getJwt(apiToken)
                .then(response => {
                    this.loginResponse = response;
                })
                .catch(err => {
                    this.loginResponse = err;
                })
        );
    this.getPipeline = pipelineId =>
        request({
            url: `${this.instance}/${this.namespace}/pipelines/${pipelineId}/jobs`,
            method: 'GET',
            context: {
                token: this.jwt
            }
        });
    this.createPipeline = (repoName, branch, rootDir = undefined) => {
        const createConfig = {
            url: `${this.instance}/${this.namespace}/pipelines`,
            method: 'POST',
            context: {
                token: this.jwt
            },
            json: {
                checkoutUrl: `git@${this.scmHostname}:${this.testOrg}/${repoName}.git#${branch}`
            }
        };

        if (rootDir) {
            createConfig.json.rootDir = rootDir;
        }

        return request(createConfig);
    };
    this.deletePipeline = pipelineId =>
        request({
            url: `${this.instance}/${this.namespace}/pipelines/${pipelineId}`,
            method: 'DELETE',
            context: {
                token: this.jwt
            }
        });
    this.ensurePipelineExists = ensurePipelineExists;
}