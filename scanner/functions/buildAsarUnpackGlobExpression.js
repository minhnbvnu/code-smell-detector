function buildAsarUnpackGlobExpression() {
  const unpack = [
    '*.node',
    'ctags-config',
    'ctags-darwin',
    'ctags-linux',
    'ctags-win32.exe',
    path.join('**', 'node_modules', 'spellchecker', '**'),
    path.join('**', 'node_modules', 'dugite', 'git', '**'),
    path.join('**', 'node_modules', 'github', 'bin', '**'),
    path.join('**', 'node_modules', 'vscode-ripgrep', 'bin', '**'),
    path.join('**', 'resources', 'atom.png')
  ];

  return `{${unpack.join(',')}}`;
}