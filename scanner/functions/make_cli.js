function make_cli() {
  return new Cli()
    // Options
    .route('help', (p, args) => p.help || p['--help'] || _.isEmpty(args))
    .route('version', (p) => p.version || p['--version'])
    // Commands
    .route('agent', (p, args) => p.agent && /(start|status|stop|configure)/.test(args))
    .route('vm', (p, args) => p.vm && /(ssh|start|status|installed|stop|remove)/.test(args))
    .route('config', (p, args) => p.config && /(list|reset|set)/.test(args))
    .route('deploy')
    .route('docker')
    .route('doctor')
    .route('info')
    .route('init')
    .route('open')
    .route('scale')
    .route('shell')
    .route('status')
    .route('start', (p) => {
      var is_start_url_system = /.*[/].*/g.test(p["<system>"]);
      var has_git_repo_option = p["<git-repo>"] !== null;
      return is_start_url_system || has_git_repo_option;
    }, 'start.getProject')
    .route('start')
    .route('restart', (p) => p.restart , 'start.index')
    .route('stop'   , (p) => p.stop    , 'start.index')
    .route('logs')
    .route('help'); // If you do not fall in any other route, the help is called.
}