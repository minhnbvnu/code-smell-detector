async function deploy(example) {
    await proxyquire('../../lib/deploy/deploy-by-tpl', {
      './deploy-support': deploySupport,
      '../ram': ram,
      '../fc': fc,
      '../trigger': trigger
    }).deploy(path.join('./examples', example, 'template.yml'), {});
  }