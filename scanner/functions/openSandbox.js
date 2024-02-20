function openSandbox(exampleCode) {
  const parameters = getParameters({
    files: {
      'index.js': { content: indexJs },
      'package.json': { content: packageJson },
      'Example.vue': { content: exampleCode },
      'static/index.html': { content: indexHtml },
    },
  });

  const url = `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}&query=${encodeURIComponent(
    'module=/Example.vue',
  )}`;
  open(url);
}