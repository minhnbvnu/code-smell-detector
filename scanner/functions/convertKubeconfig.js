function convertKubeconfig (kubeconfig) {
  const context = kubeconfig.getCurrentContext()
  const cluster = kubeconfig.getCurrentCluster()
  const user = kubeconfig.getCurrentUser()
  const namespace = context.namespace

  let ca
  let insecureSkipTlsVerify = false
  if (cluster) {
    if (cluster.caFile) {
      ca = fs.readFileSync(path.normalize(cluster.caFile))
    } else if (cluster.caData) {
      ca = Buffer.from(cluster.caData, 'base64').toString()
    }
    insecureSkipTlsVerify = cluster.skipTLSVerify
  }

  let cert
  let key

  let auth = {}
  if (user) {
    if (user.certFile) {
      cert = fs.readFileSync(path.normalize(user.certFile))
    } else if (user.certData) {
      cert = Buffer.from(user.certData, 'base64').toString()
    }

    if (user.keyFile) {
      key = fs.readFileSync(path.normalize(user.keyFile))
    } else if (user.keyData) {
      key = Buffer.from(user.keyData, 'base64').toString()
    }

    if (user.token) {
      auth.bearer = user.token
    }

    if (user.authProvider) {
      const config = user.authProvider.config

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
    auth: Object.keys(auth).length ? auth : null,
    ca,
    insecureSkipTlsVerify,
    namespace,
    cert,
    key
  }
}