function needsAction() {
    var fileStats = fs.statSync(notOwnedPath);

    var problems = [];
    var actions = [];
    if (fileStats.uid !== 0) {
      problems.push('Test files not owned by root.');
      actions.push('  sudo chown root ' + notOwnedPath);
    }
    if ((fileStats.mode & parseInt('022', 8)) !== parseInt('022', 8)) {
      problems.push('Test files not readable/writable by non-owners.');
      actions.push('  sudo chmod 666 ' + notOwnedPath);
    }
    if (actions.length > 0) {
      if (!seenActions) {
        console.log(problems.join('\n'));
        console.log('Please run the following commands and try again:');
        console.log(actions.join('\n'));
        seenActions = true;
      }
      return true;
    }
    return false;
  }