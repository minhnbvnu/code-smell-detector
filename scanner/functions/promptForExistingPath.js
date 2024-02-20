async function promptForExistingPath(path, message, deleted) {
  if (!fs.existsSync(path)) {
    return;
  }
  const stat = fs.statSync(path);
  if (stat.isDirectory()) {
    const files = fs.readdirSync(path);
    if (isEmpty(files)) {
      return;
    }
  }

  const answers = await inquirer.prompt([{
    type: 'confirm',
    name: 'ok',
    message: message
  }]);
  if (answers.ok) {
    try {
      if (deleted === true) {
        sync(path);
      }
    } catch (err) {
      throw new Error(`Failed to delete file or folder: ${path}, error is: ${err}`);
    }
  } else {
    throw new Error(); // equal to process.exit(-1);
  }
}