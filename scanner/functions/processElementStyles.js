function processElementStyles(klass, template, is, baseURI) {
      if (!builtCSS) {
        const templateStyles = template.content.querySelectorAll('style');
        const stylesWithImports = Polymer.StyleGather.stylesFromTemplate(template);
        // insert styles from <link rel="import" type="css"> at the top of the template
        const linkedStyles = Polymer.StyleGather.stylesFromModuleImports(is);
        const firstTemplateChild = template.content.firstElementChild;
        for (let idx = 0; idx < linkedStyles.length; idx++) {
          let s = linkedStyles[idx];
          s.textContent = klass._processStyleText(s.textContent, baseURI);
          template.content.insertBefore(s, firstTemplateChild);
        }
        // keep track of the last "concrete" style in the template we have encountered
        let templateStyleIndex = 0;
        // ensure all gathered styles are actually in this template.
        for (let i = 0; i < stylesWithImports.length; i++) {
          let s = stylesWithImports[i];
          let templateStyle = templateStyles[templateStyleIndex];
          // if the style is not in this template, it's been "included" and
          // we put a clone of it in the template before the style that included it
          if (templateStyle !== s) {
            s = s.cloneNode(true);
            templateStyle.parentNode.insertBefore(s, templateStyle);
          } else {
            templateStyleIndex++;
          }
          s.textContent = klass._processStyleText(s.textContent, baseURI);
        }
      }
      if (window.ShadyCSS) {
        window.ShadyCSS.prepareTemplate(template, is);
      }
    }