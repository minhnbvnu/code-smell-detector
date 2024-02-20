function contractWith(code) {
  return `
      pragma solidity 0.4.4;
        
        
      contract A {
        ${code}
      }
    `
}