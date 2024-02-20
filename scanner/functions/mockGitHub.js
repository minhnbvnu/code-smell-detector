function mockGitHub() {
  nock.disableNetConnect();

  nock('https://api.github.com')
    .get('/repos/google/web-starter-kit/releases')
    .reply(200, [{tag_name: 'v0.5.2'}]);

  nock('https://github.com')
    .filteringPath(/archive\/.*/, 'archive/zip')
    .get('/google/web-starter-kit/archive/zip')
    .replyWithFile(200, path.join(__dirname, 'data', 'wsk-0.5.2.zip'));

  nock('https://raw.githubusercontent.com')
    .get('/h5bp/server-configs-gae/master/app.yaml')
    .replyWithFile(200, path.join(__dirname, 'data', 'app.yaml'));
}