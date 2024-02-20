function decacheConfigs(){
  const paths = [
    `${process.cwd()}/${temp}/.solcover.js`,
    `${process.cwd()}/${temp}/${hardhatConfigName}`,
    `${process.cwd()}/${temp}/contracts/Simple.sol`,
    `${process.cwd()}/${temp}/test/simple.js`,
    `${process.cwd()}/${temp}/test/account-one.js`,
  ];

  paths.forEach(pth => {
    try { decache(pth) } catch (e){}
  });
}