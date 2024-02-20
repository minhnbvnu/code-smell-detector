function getSnippetBoilerplate (includeBoilerplate) {
  if (includeBoilerplate) {
    return '<?php\n' +
      '$composerHome = substr(shell_exec(\'composer config home -g\'), 0, -1).\'/vendor/autoload.php\';\n' +
      'require $composerHome; // your path to autoload.php \n' +
      'use Psr\\Http\\Message\\ResponseInterface;\n' +
      'use GuzzleHttp\\Exception\\RequestException;\n' +
      'use GuzzleHttp\\Client;\n' +
      'use GuzzleHttp\\Psr7\\Utils;\n' +
      'use GuzzleHttp\\Psr7\\Request;\n';
  }
  return '<?php\n';
}