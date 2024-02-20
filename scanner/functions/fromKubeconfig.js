function fromKubeconfig (kubeconfig, current) {
  if (!kubeconfig) kubeconfig = loadKubeconfig()
  // if kubeconfig is provided as a path to the yaml file,
  // or array of paths to the yaml files,
  // automatically load it.
  if (typeof kubeconfig === 'string' || Array.isArray(kubeconfig)) {
    kubeconfig = loadKubeconfig(kubeconfig)
  }

  current = current || kubeconfig['current-context']
  const context = kubeconfig.contexts
    .find(item => item.name === current).context
  const cluster = kubeconfig.clusters
    .find(item => item.name === context.cluster).cluster
  const userConfig = kubeconfig.users
    .find(user => user.name === context.user)
  const user = userConfig ? userConfig.user : null
  const namespace = context.namespace

  let ca
  let insecureSkipTlsVerify = false
  if (cluster) {
    if (cluster['certificate-authority']) {
      ca = fs.readFileSync(path.normalize(cluster['certificate-authority']))
    } else if (cluster['certificate-authority-data']) {
      ca = Buffer.from(cluster['certificate-authority-data'], 'base64').toString()
    }

    if (cluster['insecure-skip-tls-verify']) {
      insecureSkipTlsVerify = cluster['insecure-skip-tls-verify']
    }
  }

  let cert
  let key

  let auth = {}
  if (user) {
    if (user['client-certificate']) {
      cert = fs.readFileSync(path.normalize(user['client-certificate']))
    } else if (user['client-certificate-data']) {
      cert = Buffer.from(user['client-certificate-data'], 'base64').toString()
    }

    if (user['client-key']) {
      key = fs.readFileSync(path.normalize(user['client-key']))
    } else if (user['client-key-data']) {
      key = Buffer.from(user['client-key-data'], 'base64').toString()
    }

    if (user.token) {
      auth.bearer = user.token
    }

    if (user['auth-provider']) {
      const config = user['auth-provider'].config

      // if we can't determine the type, just fail later (or don't refresh).
      let type = null
      let token = null
      if (config['cmd-path']) {
        type = 'cmd'
        token = config['access-token']
      } else if (config['idp-issuer-url']) {
        type = 'openid'
        token = config['id-token']
      }

      // If we have just an access-token, allow that... will expire later though.
      if (config['access-token'] && !type) {
        token = config['access-token']
      }

      auth = {
        request: {
          bearer: token
        },
        provider: {
          config,
          type
        }
      }
    }

    if (user.exec) {
      const env = {}
      if (user.exec.env) {
        user.exec.env.forEach(variable => {
          env[variable.name] = variable.value
        })
      }
      let args = ''
      if (user.exec.args) {
        args = user.exec.args.join(' ')
      }
      auth = {
        provider: {
          type: 'cmd',
          config: {
            'cmd-args': args,
            'cmd-path': user.exec.command,
            'token-key': 'status.token',
            'cmd-env': env
          }
        }
      }
    }

    if (user.username) auth.user = user.username
    if (user.password) auth.pass = user.password
  }

  return {
    url: cluster.server,
    namespace,
    auth: Object.keys(auth).length ? auth : null,
    ca,
    insecureSkipTlsVerify,
    key,
    cert
  }
}