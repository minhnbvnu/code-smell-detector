function parseStatus (status) {
  var lines;
  var branchLine;
  var branches;
  var statusRet = {
    localBranch: null,
    remoteBranch: null,
    remoteDiff: null,
    clean: true,
    files: []
  };
  var result;
  var initialCommitReg =/^\#\# Initial commit on ([^\n]+)\s?$/;
  lines = status.trim().split('\n');
  branchLine = lines.shift();
  result = branchLine.match(initialCommitReg);
  if (result){
    statusRet.localBranch = result[1];
    statusRet.clean = false;
    return statusRet;
  }
  branchLine = branchLine.replace(/\#\#\s+/, '');

  branches = branchLine.split('...');
  statusRet.localBranch = branches[0];
  statusRet.remoteDiff = null;
  if (branches[1]){
    result = branches[1].match(/^([^\s]+)/);
    statusRet.remoteBranch = result[1];
    result = branches[1].match(/\[([^\]]+)\]/);
    statusRet.remoteDiff = result ? result[1] : null;
  }
  lines.forEach(function(str){
    if (status.match(/\S/)){
      statusRet.files.push(str);
    }
  });
  statusRet.clean = statusRet.files.length === 0;
  return statusRet;
}