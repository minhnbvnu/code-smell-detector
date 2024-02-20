function gettransaction (params) {
  return bci.blockexplorer.getTx(params.hash)
}