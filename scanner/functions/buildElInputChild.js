function buildElInputChild(conf) {
  const children = []
  if (conf.prepend) {
    children.push(`<template slot="prepend">${conf.prepend}</template>`)
  }
  if (conf.append) {
    children.push(`<template slot="append">${conf.append}</template>`)
  }
  return children.join('\n')
}