function runIntegTests () {
  const params = { stdio: 'inherit', shell: true, cwd: path.resolve(__dirname, '..') }

  // run the tests with 4 worker threads so the 40 minute-long test runs run in parallel
  // increase this as tests are added, if needed
  for (const region of ['us-east-1', 'us-west-2']) {
    spawnSync(`sam package --region ${region} --template-file ./cloudformation/template.yaml --output-template-file ./cloudformation/packaged-${region}.yaml --s3-bucket dev-portal-integ-${region}`, params)
  }

  return spawnSync(bin('', 'jest') + ' -w 4 cfn-integration-test', params)
}