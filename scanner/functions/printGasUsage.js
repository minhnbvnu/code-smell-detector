async function printGasUsage() {
  console.log('  Gas Usage: \x1b[31m(' + totalGasUsage + ' gas)\u001b[00m');
  for (const describe of Object.values(describes)) {
    console.log('    ' + describe.name + ' \x1b[31m(' + describe.gasUsed + ' gas)\u001b[00m');
    for (const test of describe.tests){
      console.log('      ' + test.name + ' \x1b[31m(' + test.gasUsed + ' gas)\u001b[00m');
    }
  }
}