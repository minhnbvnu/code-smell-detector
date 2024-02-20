function buildImports(section) {
  section.description = section.description.replace(codeRegex, (match, className) => {
    if (className === 'language-js' && !match.includes('// exclude-tablist')) {
      let globalImport = match.replace(importRegex, `let {$1} = kontra`);
      let esImport = match.replace(importRegex, `import {$1} from 'path/to/kontra.mjs'`);
      let bundlerImport = match;

      return `<div class="tablist">
  <ul role="tablist">
    <li role="presentation" data-tab="global">
      <button role="tab" id="${section.id}-global-tab">Global Object</button>
    </li>
    <li role="presentation" data-tab="es">
      <button role="tab" id="${section.id}-es-tab">ES Module Import</button>
    </li>
    <li role="presentation" data-tab="bundle">
      <button role="tab" id="${section.id}-bundle-tab">Module Bundler</button>
    </li>
    <li role="presentation"></li>
  </ul>
  <section role="tabpanel" aria-labelledby=${section.id}-global-tab data-tabpanel="global">${globalImport}</section>
  <section role="tabpanel" aria-labelledby=${section.id}-es-tab data-tabpanel="es">${esImport}</section>
  <section role="tabpanel" aria-labelledby=${section.id}-bundle-tab data-tabpanel="bundle">${bundlerImport}</section>
</div>`;
    } else {
      return match.replace('// exclude-tablist\n', '');
    }
  });
}