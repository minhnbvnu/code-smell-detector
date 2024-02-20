function printSuccess() {
    success(`
Success! Created ${projectName} at ${dest}.

Inside that directory, you can run several commands:
  * npm start: Starts the development server.
  * npm run build: Bundles the app into dist for production.
  * npm test: Run test.

We suggest that you begin by typing:
  cd ${dest}
  npm start

Happy hacking!`);
  }