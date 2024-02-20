function writeShim_ (src, to, opts) {
  opts = Object.assign({}, DEFAULT_OPTIONS, opts)
  let shTarget = path.relative(path.dirname(to), src)
  let target = shTarget.split('/').join('\\')
  let longProg
  let prog = opts.prog
  let shProg = prog && prog.split('\\').join('/')
  let shLongProg
  let pwshProg = shProg && `"${shProg}$exe"`
  let pwshLongProg
  shTarget = shTarget.split('\\').join('/')
  let args = opts.args || ''
  let {
    win32: nodePath,
    posix: shNodePath
  } = normalizePathEnvVar(opts.nodePath)
  if (!prog) {
    prog = `"%~dp0\\${target}"`
    shProg = `"$basedir/${shTarget}"`
    pwshProg = shProg
    args = ''
    target = ''
    shTarget = ''
  } else {
    longProg = `"%~dp0\\${prog}.exe"`
    shLongProg = '"$basedir/' + prog + '"'
    pwshLongProg = `"$basedir/${prog}$exe"`
    target = `"%~dp0\\${target}"`
    shTarget = `"$basedir/${shTarget}"`
  }

  let cmd
  if (opts.createCmdFile) {
    // @IF EXIST "%~dp0\node.exe" (
    //   "%~dp0\node.exe" "%~dp0\.\node_modules\npm\bin\npm-cli.js" %*
    // ) ELSE (
    //   SETLOCAL
    //   SET PATHEXT=%PATHEXT:;.JS;=;%
    //   node "%~dp0\.\node_modules\npm\bin\npm-cli.js" %*
    // )
    cmd = nodePath ? `@SET NODE_PATH=${nodePath}\r\n` : ''
    if (longProg) {
      cmd += '@IF EXIST ' + longProg + ' (\r\n' +
        '  ' + longProg + ' ' + args + ' ' + target + ' %*\r\n' +
        ') ELSE (\r\n' +
        '  @SETLOCAL\r\n' +
        '  @SET PATHEXT=%PATHEXT:;.JS;=;%\r\n' +
        '  ' + prog + ' ' + args + ' ' + target + ' %*\r\n' +
        ')'
    } else {
      cmd += `@${prog} ${args} ${target} %*\r\n`
    }
  }

  // #!/bin/sh
  // basedir=`dirname "$0"`
  //
  // case `uname` in
  //     *CYGWIN*) basedir=`cygpath -w "$basedir"`;;
  // esac
  //
  // if [ -x "$basedir/node.exe" ]; then
  //   "$basedir/node.exe" "$basedir/node_modules/npm/bin/npm-cli.js" "$@"
  //   ret=$?
  // else
  //   node "$basedir/node_modules/npm/bin/npm-cli.js" "$@"
  //   ret=$?
  // fi
  // exit $ret

  let sh = '#!/bin/sh\n'
  sh = sh +
    "basedir=$(dirname \"$(echo \"$0\" | sed -e 's,\\\\,/,g')\")\n" +
    '\n' +
    'case `uname` in\n' +
    '    *CYGWIN*) basedir=`cygpath -w "$basedir"`;;\n' +
    'esac\n' +
    '\n'
  const env = opts.nodePath ? `NODE_PATH="${shNodePath}" ` : ''

  if (shLongProg) {
    sh = sh +
      'if [ -x ' + shLongProg + ' ]; then\n' +
      '  ' + env + shLongProg + ' ' + args + ' ' + shTarget + ' "$@"\n' +
      '  ret=$?\n' +
      'else \n' +
      '  ' + env + shProg + ' ' + args + ' ' + shTarget + ' "$@"\n' +
      '  ret=$?\n' +
      'fi\n' +
      'exit $ret\n'
  } else {
    sh = sh + env + shProg + ' ' + args + ' ' + shTarget + ' "$@"\n' +
      'exit $?\n'
  }

  // #!/usr/bin/env pwsh
  // $basedir=Split-Path $MyInvocation.MyCommand.Definition -Parent
  //
  // $ret=0
  // $exe = ""
  // if ($PSVersionTable.PSVersion -lt "6.0" -or $IsWindows) {
  //   # Fix case when both the Windows and Linux builds of Node
  //   # are installed in the same directory
  //   $exe = ".exe"
  // }
  // if (Test-Path "$basedir/node") {
  //   & "$basedir/node$exe" "$basedir/node_modules/npm/bin/npm-cli.js" $args
  //   $ret=$LASTEXITCODE
  // } else {
  //   & "node$exe" "$basedir/node_modules/npm/bin/npm-cli.js" $args
  //   $ret=$LASTEXITCODE
  // }
  // exit $ret
  let pwsh = '#!/usr/bin/env pwsh\n' +
    '$basedir=Split-Path $MyInvocation.MyCommand.Definition -Parent\n' +
    '\n' +
    '$exe=""\n' +
    (opts.nodePath ? '$env_node_path=$env:NODE_PATH\n' +
      `$env:NODE_PATH="${nodePath}"\n` : '') +
    'if ($PSVersionTable.PSVersion -lt "6.0" -or $IsWindows) {\n' +
    '  # Fix case when both the Windows and Linux builds of Node\n' +
    '  # are installed in the same directory\n' +
    '  $exe=".exe"\n' +
    '}'
  if (opts.nodePath) {
    pwsh = pwsh +
      ' else {\n' +
      `  $env:NODE_PATH="${shNodePath}"\n` +
      '}'
  }
  pwsh += '\n'
  if (shLongProg) {
    pwsh = pwsh +
      '$ret=0\n' +
      `if (Test-Path ${pwshLongProg}) {\n` +
      `  & ${pwshLongProg} ${args} ${shTarget} $args\n` +
      '  $ret=$LASTEXITCODE\n' +
      '} else {\n' +
      `  & ${pwshProg} ${args} ${shTarget} $args\n` +
      '  $ret=$LASTEXITCODE\n' +
      '}\n' +
      (opts.nodePath ? '$env:NODE_PATH=$env_node_path\n' : '') +
      'exit $ret\n'
  } else {
    pwsh = pwsh +
      `& ${pwshProg} ${args} ${shTarget} $args\n` +
      (opts.nodePath ? '$env:NODE_PATH=$env_node_path\n' : '') +
      'exit $LASTEXITCODE\n'
  }

  return Promise.all([
    opts.createCmdFile && fs.writeFile(to + '.cmd', cmd, 'utf8'),
    opts.createPwshFile && fs.writeFile(`${to}.ps1`, pwsh, 'utf8'),
    fs.writeFile(to, sh, 'utf8')
  ])
    .then(() => chmodShim(to, opts))
}