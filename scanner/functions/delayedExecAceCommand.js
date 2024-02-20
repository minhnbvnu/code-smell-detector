function delayedExecAceCommand(op, ace) {
    ace.off("beforeEndOperation", delayedExecAceCommand);
    var cmd = ace.state.cm.vimCmd;
    if (cmd) {
      ace.execCommand(cmd.exec ? cmd : cmd.name, cmd.args);
    }
    ace.curOp = ace.prevOp;
  }