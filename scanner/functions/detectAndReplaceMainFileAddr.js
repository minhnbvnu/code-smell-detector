async function detectAndReplaceMainFileAddr(codeDir, mainFile, addrProcessores) {
  const mainFileContents = await fs.readFile(mainFile, 'utf8');

  for (const addrProcessor of addrProcessores) {
    const addrRegex = addrProcessor.regex;
    const replacer = addrProcessor.replacer;

    if (addrRegex.test(mainFileContents)) {
      if (isFcConsoleApplication()) {
        await writePortFileForFcConsoleApplication(codeDir);

        return;
      }

      console.log(`${yellow('Fun detected')} your application doesn't listen on '${yellow('0.0.0.0:9000')}' in ${yellow(mainFile)}`);
      console.log(`Fun will replace your addr to '${yellow('0.0.0.0:9000')}', and also backup your origin file ${yellow(mainFile)} to ${yellow(mainFile + '.bak')}`);

      if (!await promptForConfirmContinue(yellow(`Are your sure?`))) {
        console.warn(red(`Fun will not modify your application listen addr, but if you want deploy to fc, you must listen on '0.0.0.0:9000'`));
        return;
      }

      const replacedContent = mainFileContents.replace(addrRegex, (match, p1) => {
        if (_.isFunction(replacer)) {
          return replacer(match, p1);
        }
        return replacer;
      });

      await fs.copyFile(mainFile, mainFile + '.bak');
      await fs.writeFile(mainFile, replacedContent);

      return;
    }
  }
}