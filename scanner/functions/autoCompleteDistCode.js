function autoCompleteDistCode(codeVal, type) {
  let provinceCode = codeVal.toString().slice(0, 2) + '0000'
  let cityCode = ''
  if (type == 'city') {
    return { provinceCode, cityCode: codeVal }
  }
  if (type == 'area') {
    cityCode = codeVal.toString().slice(0, 4) + '00'
    return { provinceCode, cityCode }
  }
}