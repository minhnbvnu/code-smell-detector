function checkTW360External(key){
  if(!external){ return; } // return undefined.
  try{
    //        360安装路径：
    //        C:%5CPROGRA~1%5C360%5C360se3%5C360SE.exe
    const runpath = external.twGetRunPath.toLowerCase();
    // 360SE 3.x ~ 5.x support.
    // 暴露的 external.twGetVersion 和 external.twGetSecurityID 均为 undefined。
    // 因此只能用 try/catch 而无法使用特性判断。
    const security = external.twGetSecurityID(win);
    const version = external.twGetVersion(security);

    if (runpath && runpath.indexOf(key) === -1) { return false; }
    if (version){return {version: version}; }
  }catch(ex){ /* */ }
}