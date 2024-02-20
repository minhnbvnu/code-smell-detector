function libraryWith(code) {
  return `
      pragma solidity 0.4.4;
        
        
      library A {
        ${code}
      }
    `
}