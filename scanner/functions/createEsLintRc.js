function createEsLintRc(answers = { moduleType: 'esm' }) {
  const DEFAULT_ECMA_VERSION = 2018;
  const config = {
    rules: {},
    env: {},
    parserOptions: {},
    extends: [],
  };
  config.parserOptions.ecmaVersion = DEFAULT_ECMA_VERSION;
  config.env.es6 = true;
  config.globals = {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  };

  if (answers.moduleType === 'esm') {
    config.parserOptions.sourceType = 'module';
  } else if (answers.moduleType === 'commonjs') {
    config.env.commonjs = true;
  }
  // add in browser and node environments if necessary
  // eslint-disable-next-line lodash/prefer-lodash-method
  answers.env.forEach(env => {
    config.env[env] = true;
  });

  if (answers.framework === 'react') {
    config.parserOptions.ecmaFeatures = {
      jsx: true,
    };
    config.plugins = ['react'];
  } else if (answers.framework === 'vue') {
    config.plugins = ['vue'];
    config.extends.push('plugin:vue/essential');
  }
  if (answers.extends) {
    config.extends.push(answers.extends);
  }
  config.extends.unshift('eslint:recommended');
  // normalize extends
  if (config.extends.length === 0) {
    delete config.extends;
  } else if (config.extends.length === 1) {
    config.extends = config.extends[0];
  }
  return JSON.stringify(config, null, 2);
}