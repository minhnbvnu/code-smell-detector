function buildEntry(filename) {
  const content = `${tips}
import Component from './${filename}.vue';${
  !isPreviewHtml(filename)
    ? `\nimport xss from '@/utils/xss/index';
import Lang from '@/lang/';`
    : ''
}
// font css
import '@/assets/css/font';

const version = '${version}';

const install = (Vue) => {
  Vue.component(Component.name, Component);
};

Component.version = version;
Component.install = install;${
  !isPreviewHtml(filename) ? '\nComponent.xss = xss;\nComponent.lang = Lang;\n' : ''
}
Component.use = function (optionsOrInstall, opt) {
  if (typeof optionsOrInstall === 'function') {
    optionsOrInstall(Component, opt);
  } else {
    optionsOrInstall.install(Component, opt);
  }

  return Component;
};

export default Component;
`;

  fs.writeFileSync(path.join(__dirname, `../src/${filename}.js`), content);
}