function printInstructions(title) {
  console.log([
    '',
    chalk.bgBlue.white.bold(' ' + title + ' '),
    '  When you see Red Box with stack trace, you can click any ',
    '  stack frame to jump to the source file. The packager will launch your ',
    '  editor of choice. It will first look at REACT_EDITOR environment ',
    '  variable, then at EDITOR. To set it up, you can add something like ',
    '  export REACT_EDITOR=atom to your ~/.bashrc or ~/.zshrc depending on ',
    '  which shell you use.',
    ''
  ].join('\n'));
}