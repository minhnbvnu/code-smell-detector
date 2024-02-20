function generateJs (vueId, inputFile, compileResult, isHotReload = false) {
  const isDev = isDevelopment()
  const inputFilePath = inputFile.getPathInPackage()

  let js = 'var __vue_script__, __vue_template__; ' + compileResult.code + '\n'
  js += `__vue_script__ = __vue_script__ || {};`
  js += `var __vue_options__ = (typeof __vue_script__ === "function" ?
  (__vue_script__.options || (__vue_script__.options = {}))
  : __vue_script__);`

  let render, staticRenderFns

  let templateHash
  if (compileResult.template) {
    if (!isHotReload) {
      templateHash = Hash(compileResult.template)
    }

    if (vueVersion === 1) {
      // Fix quotes
      compileResult.template = compileResult.template.replace(quoteReg, '&#39;').replace(lineReg, '')
      js += "__vue_template__ = '" + compileResult.template + "';"

      // Template option
      js += `__vue_options__.template = __vue_template__;\n`
    } else if (vueVersion === 2) {
      const compiler = loadPackage(inputFile, 'vue-template-compiler', loadDefaultTemplateCompiler)
      const templateCompilationResult = compiler.compile(compileResult.template, {
        id: vueId,
        warn: (message) => {
          const msg = `${inputFilePath}: ${message}`
          console.warn(`   (!) Warning: ${msg}`.yellow)
          if (isDev) {
            global._dev_server.emit('message', {
              type: 'warn',
              message: msg,
            })
          }
        },
      })
      if (templateCompilationResult.errors && templateCompilationResult.errors.length !== 0) {
        console.error(...templateCompilationResult.errors)
        js += `__vue_options__.render = function(){};\n`
        js += `__vue_options__.staticRenderFns = [];\n`
        if (isDev) {
          global._dev_server.emit('message', {
            type: 'error',
            message: templateCompilationResult.errors.map(e => e.toString()).join('\n'),
          })
        }
      } else {
        render = toFunction(templateCompilationResult.render)
        staticRenderFns = `[${templateCompilationResult.staticRenderFns.map(toFunction).join(',')}]`
        let renderJs = `__vue_options__.render = ${render};\n`
        renderJs += `__vue_options__.staticRenderFns = ${staticRenderFns};\n`
        const transpile = loadPackage(inputFile, 'vue-template-es2015-compiler', loadDefaultTranspiler)
        renderJs = transpile(renderJs)
        if (isDev) {
          renderJs += `__vue_options__.render._withStripped = true;\n`
        }
        js += renderJs
      }
    }

    // console.log(`template hash: ${templateHash}`)
  }

  // Scope
  if (vueVersion === 2) {
    js += `__vue_options__._scopeId = '${vueId}';`
  }

  // CSS Modules
  if (compileResult.cssModules) {
    const modules = Object.keys(compileResult.cssModules)
    const modulesCode = '__vue_options__.computed = __vue_options__.computed || {};\n' +
      modules.map(module => `__vue_options__.computed['${module}'] = function() {\n return ${compileResult.cssModules[module]}\n};\n`).join('\n')
    js += modulesCode
    // console.log(modulesCode)
  }

  // Package context
  js += `__vue_options__.packageName = '${inputFile.getPackageName()}';`

  // Auto register
  let isGlobalName = globalFileNameReg.test(inputFilePath)
  let ext = (isGlobalName ? '.global' : '') + '.vue'

  let name = Plugin.path.basename(inputFilePath)
  name = name.substring(0, name.lastIndexOf(ext))

  // Remove special characters
  name = name.replace(nonWordCharReg, match => {
    if (match !== '-') {
      return ''
    } else {
      return match
    }
  })

  // Kebab case
  name = name.replace(capitalLetterReg, (match) => {
    return '-' + match.toLowerCase()
  })
  name = name.replace(trimDashReg, '')

  // Auto default name
  js += `\n__vue_options__.name = __vue_options__.name || '${name}';`

  // Export
  js += `module.export('default', exports.default = __vue_script__);exports.__esModule = true;`

  if (!isHotReload) {
    // Hot-reloading
    if (isDev && inputFile.getArch().indexOf('web') !== -1) {
      js += `\nif(!window.__vue_hot__){
        window.__vue_hot_pending__ = window.__vue_hot_pending__ || {};
        window.__vue_hot_pending__['${vueId}'] = __vue_script__;
      } else {
        window.__vue_hot__.createRecord('${vueId}', __vue_script__);
      }`
    }

    let isOutsideImports = inputFilePath.split('/').indexOf('imports') === -1
    if (isOutsideImports || isGlobalName) {
      // Component registration
      js += `\nvar _Vue = require('vue').default;
      if (!_Vue) _Vue = require('vue');
      _Vue.component(__vue_options__.name, __vue_script__);\n`
    }
  }

  return {
    js,
    templateHash,
    render,
    staticRenderFns,
  }
}