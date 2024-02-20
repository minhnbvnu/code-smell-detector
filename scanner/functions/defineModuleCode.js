function defineModuleCode(moduleName, code, verboseName = '') {
  return [
    `__d(`,
    `${JSON.stringify(moduleName)} /* ${verboseName} */, `,
    `function(global, require, module, exports) {`,
      `${code}`,
    '\n});',
  ].join('');
}