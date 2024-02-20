function questions(defaults) {
  defaults = defaults || {};

  return [{
      message: 'Site name',
      name: 'siteName',
      default: defaults.siteName || process.cwd().split(path.sep).pop()
    }, {
      message: 'Site description',
      name: 'siteDescription',
      default: defaults.siteDescription
    }, {
      message: [
        'Site URL (e.g. www.example.org, https://owner.github.io)',
        '  hit enter to skip.',
        ''
      ].join('\n'),
      name: 'siteUrl',
      default: defaults.siteUrl,
      filter: function (url) {
        if (url && url.substring(0, 4) !== 'http') {
          url = 'http://' + url;
        }

        return url;
      },
      validate: function (url) {
        if (!url || RE_URL.test(url)) {
          return true;
        }

        return 'That doesn\'t look like a valid URL';
      }
    }, {
      message: 'Do you want a default layout?',
      name: 'layoutChoice',
      type: 'list',
      choices: [
        {value: 'default', name: 'Yes, supports IE10+'},
        {value: 'ie8', name: 'No, barebones HTML file'}
      ],
      default: defaults.layoutChoice || 'default'
    }, {
      message: ('Google Analytics tracking ID, or hit enter to skip.\n  '+
                '(get your tracking ID at https://www.google.com/analytics/web/)\n '),
      name: 'gaTrackId',
      default: defaults.gaTrackId
    }, {
      message: 'Where would you like to host the site?',
      name: 'hostingCat',
      type: 'list',
      choices: [
        {value: 'paas', name: 'PaaS (GAE, Heroku)'},
        {value: 'static', name: 'Static (GitHub, GCS, S3)'},
        {value: 'server', name: 'Server (Apache, Nginx, etc.)'},
        {value: 'none', name: 'Nowhere, don\'t worry about it'}
      ],
      default: function (answers) {
        return defaults.hostingCat || (isGitHub(answers.siteUrl) ? 'static' : 'none');
      }
    }, {
      message: 'Which PaaS is it?',
      name: 'hostingChoice',
      type: 'list',
      choices: [
        {value: 'gae', name: 'Google App Engine (GAE)'},
        {value: 'heroku', name: 'Heroku'},
        {value: 'none', name: 'Other (not supported)'}
      ],
      default: defaults.hostingChoice || 'none',
      when: function (answers) {
        return answers.hostingCat === 'paas';
      }
    }, {
      message: 'Which static hosting is it?',
      name: 'hostingChoice',
      type: 'list',
      choices: [
        {value: 'github', name: 'GitHub'},
        {value: 'gcs', name: 'Google Cloud Storage (GCS)'},
        {value: 's3', name: 'Amazon AWS S3'},
        {value: 'none', name: 'Other (not supported)'}
      ],
      default: function (answers) {
        return defaults.hostingChoice || (isGitHub(answers.siteUrl) ? 'github' : 'none');
      },
      when: function (answers) {
        return answers.hostingCat === 'static';
      }
    }, {
      message: 'Which server is it?',
      name: 'hostingChoice',
      type: 'list',
      choices: [
        {value: 'apache', name: 'Apache'},
        {value: 'nginx', name: 'Nginx'},
        {value: 'nodejs', name: 'Node.js'},
        {value: 'other', name: 'Other (not supported'}
      ],
      default: defaults.hostingChoice || 'other',
      when: function (answers) {
        return answers.hostingCat === 'server';
      }
    }, {
      message: [
        'What Project ID shall we use?',
        '  (you can see all your projects on https://cloud.google.com/console)',
        ''
      ].join('\n'),
      name: 'gcloudProjectId',
      default: defaults.gcloudProjectId,
      validate: function (v) {
        return v ? true : 'need a Project ID';
      },
      when: function (answers) {
        return answers.hostingChoice === 'gae';
      }
    }, {
      message: [
        'What is your Heroku app name?',
        '  (just hitting enter is OK, we\'ll create one for you)',
        ''
      ],
      name: 'herokuApp',
      default: defaults.herokuApp,
      when: function (answers) {
        return answers.hostingChoice === 'heroku';
      }
    }, {
      message: 'Site domain (e.g. www.example.org) or a bucket name',
      name: 'siteDomain',
      default: defaults.siteDomain,
      when: function (answers) {
        return ['gcs', 's3'].indexOf(answers.hostingChoice) >= 0 && !answers.siteUrl;
      }
    }, {
      message: 'GitHub username or owner/project',
      name: 'githubTarget',
      default: function (answers) {
        var user;
        var repo;

        if (defaults.githubTarget) {
          return defaults.githubTarget;
        }

        if (isGitHub(answers.siteUrl)) {
          var match = answers.siteUrl.match(RE_URL);
          var name = match[1].split('.')[0];
          var p = match[2] && match[2].length > 1 ? match[2] : '/' + name + '.github.io';

          return name + p;
        }

        try {
          var gitcfg = iniparser.parseSync(path.join(process.env.HOME, '.gitconfig'));
          user = (gitcfg.github || {}).user;
        } catch (err) {}

        user = user || process.env.USER || process.env.USERNAME;
        repo = extractDomain(answers.siteUrl) || (user + '.github.io');

        return user && repo ? [user, repo].join('/') : '';
      },
      validate: function (v) {
        if (RE_GITHUB_TARGET.test(v)) {
          return true;
        }

        return 'It\'s either \'owner\' or \'owner/repo\'';
      },
      filter: function (v) {
        if (v && v.indexOf('/') === -1) {
          v += '/' + v + '.github.io';
        }

        return (v || '').replace(/["']/g, '');
      },
      when: function (answers) {
        return answers.hostingChoice === 'github';
      }
    }, {
      message: 'What is your deployment strategy?',
      name: 'deployChoice',
      type: 'list',
      choices: [
        {value: 'sftp', name: 'Secure FTP (FTP via SSH)'},
        {value: 'rsync', name: 'rsync'},
        {value: 'none', name: 'None of the above'}
      ],
      default: defaults.deployChoice || 'none',
      when: function (answers) {
        return answers.hostingCat === 'server';
      }
    }, {
      message: 'Deployment URL (e.g. user@server:[path])',
      name: 'deployDest',
      default: function (answers) {
        if (defaults.deployDest) {
          return defaults.deployDest;
        }

        var user = process.env.USER || process.env.USERNAME;
        var host = extractDomain(answers.siteUrl);
        var dest = '';

        if (user && host) {
          dest = user + '@' + host + ':' + (answers.siteName || '');
        }

        return dest;
      },
      when: function (answers) {
        return answers.deployChoice && answers.deployChoice !== 'none';
      }
    }, {
      message: 'Looks good?',
      name: 'confirmed',
      type: 'confirm',
      default: true
    }
  ];
}