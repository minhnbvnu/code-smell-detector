function codeToCompilerInput(code) {
  return JSON.stringify({
    language: 'Solidity',
    sources: { 'test.sol': { content: code } },
    settings: {
      outputSelection: {'*': { '*': [ '*' ] }},
      evmVersion: "paris",
      viaIR: process.env.VIA_IR === "true"
    }
  });
}