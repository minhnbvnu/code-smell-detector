function generateUsage(name, isFPFn) {
  const submodule = isFPFn ? '/fp' : ''

  let usage = {
    commonjs: {
      title: 'CommonJS',
      code: `var ${name} = require('date-fns-tz${submodule}/${name}')`,
    },

    es2015: {
      title: 'ES 2015',
      code: `import ${name} from 'date-fns-tz${submodule}/${name}'`,
    },

    esm: {
      title: 'ESM',
      code: `import { ${name} } from 'date-fns-tz${submodule && `/esm/${submodule}`}'`,
      text:
        'See [ECMAScript Modules guide](https://date-fns.org/docs/ECMAScript-Modules) for more information',
    },
  }

  return usage
}