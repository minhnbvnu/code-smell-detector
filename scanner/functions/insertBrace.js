function insertBrace(contract, item, offset) {
  return contract.slice(0,item.pos + offset) + item.type + contract.slice(item.pos + offset)
}