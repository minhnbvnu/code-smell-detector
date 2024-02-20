function buildFunction(root, functionText, component, templateKey) {
    var i = 0;
    var tagParams = [];
    var literalParts = [];
    var attrsValueKeysParams = [];

    if (root instanceof Array) {
      //throw error about adjacent elements
    } else {
      //Universal output or Inferno output
      if (output === t7.Outputs.Universal || output === t7.Outputs.Mithril) {
        //if we have a tag, add an element, check too for a component
        if (root.tag != null) {
          if (isComponentName(root.tag) === false) {
            functionText.push("{tag: '" + root.tag + "'");
            //add the key
            if (root.key != null) {
              tagParams.push("key: " + root.key);
            }
            //build the attrs
            if (root.assignments != null) {
              tagParams.push("attrs: " + joinAttrs(root.assignments));
            }
            //build the children for this node
            buildUniversalChildren(root, tagParams, true, component);
            functionText.push(tagParams.join(',') + "}");
          } else {
            if (((typeof window != "undefined" && component === window) || component == null) && precompile === false) {
              throw new Error("Error referencing component '" + root.tag + "'. Components can only be used when within modules. See documentation for more information on t7.module().");
            }
            if (output === t7.Outputs.Universal) {
              //we need to apply the tag components
              functionText.push("__$components__." + root.tag + "(" + joinAttrs(root.assignments) + ")");
            } else if (output === t7.Outputs.Mithril) {
              //we need to apply the tag components
              functionText.push("m.component(__$components__." + root.tag + "," + joinAttrs(root.assignments) + ")");
            }
          }
        } else {
          //add a text entry
          functionText.push("'" + root + "'");
        }
      }
      //Inferno output
      else if (output === t7.Outputs.Inferno) {
        //inferno is a bit more complicated, it requires both a fragment "vdom" and a template to be generated
        var key = root.key;
        if (root.key === undefined) {
          key = null;
        }
        var template = "null";
        var component = null;
        var props = null;
        var templateParams = [];
        var valueCounter = {
          index: 0,
          t7Required: false
        };
        var templateValues = [];

        if (isComponentName(root.tag) === true) {
          component = "__$components__." + root.tag;
          props = " " + joinAttrs(root.assignments);
        } else {
          templateParams.push("var root = Inferno.dom.createElement('" + root.tag + "');");
          if (root.assignments) {
            var helper = infernoTemplateHelper.bind(null, root, "root", templateValues, templateParams, valueCounter, null);
            templateParams.push("Inferno.dom.addAttributes(root, " + joinAttrs(root.assignments, helper) + ");");
          }
        }

        if (root.children.length > 0) {
          buildInfernoTemplate(root, valueCounter, null, templateValues, templateParams, component);
          templateParams.push("fragment.dom = root;");
          var scriptCode = templateParams.join("\n");
          if (templateValues.length === 1) {
            scriptCode = scriptCode.replace(/fragment.templateValues\[0\]/g, "fragment.templateValue");
            scriptCode = scriptCode.replace(/fragment.templateElements\[0\]/g, "fragment.templateElement");
            scriptCode = scriptCode.replace(/fragment.templateTypes\[0\]/g, "fragment.templateType");
          }
          if (isBrowser === true) {
            addNewScriptFunction('t7._templateCache["' + templateKey + '"]=function(fragment, t7){"use strict";\n' + scriptCode + '}', templateKey);
          } else {
            t7._templateCache[templateKey] = new Function('"use strict";var fragment = arguments[0];var t7 = arguments[1];\n' + scriptCode);
          }
          t7._templateCache[templateKey].key = templateKey;
          template = 't7._templateCache["' + templateKey + '"]';
        }

        var templateValuesString = "";

        if (templateValues.length === 1) {
          templateValuesString = "templateValue: " + templateValues[0] + ", templateElements: null, templateTypes: null, t7ref: t7";
        } else if (templateValues.length > 1) {
          templateValuesString = "templateValues: [" + templateValues.join(", ") + "], templateElements: Array(" + templateValues.length + "), templateTypes: Array(" + templateValues.length + "), t7ref: t7";
        }

        if (component !== null) {
          functionText.push("{dom: null, component: " + component + ", props: " + props + ", key: " + key + ", template: " + template + (root.children.length > 0 ? ", " + templateValuesString : "") + "}");
        } else {
          functionText.push("{dom: null, key: " + key + ", template: " + template + (root.children.length > 0 ? ", " + templateValuesString : "") + "}");
        }
      }
      //React output
      else if (output === t7.Outputs.React) {
        //if we have a tag, add an element
        if (root.tag != null) {
          //find out if the tag is a React componenet
          if (isComponentName(root.tag) === true) {
            if (((typeof window != "undefined" && component === window) || component == null) && precompile === false) {
              throw new Error("Error referencing component '" + root.tag + "'. Components can only be used when within modules. See documentation for more information on t7.module().");
            }
            functionText.push("React.createElement(__$components__." + root.tag);
          } else {
            functionText.push("React.createElement('" + root.tag + "'");
          }
          //the props/attrs
          if (root.assignments != null) {
            tagParams.push(joinAttrs(root.assignments));
          } else {
            tagParams.push("null");
          }
          //build the children for this node
          buildReactChildren(root, tagParams, true, component);
          functionText.push(tagParams.join(',') + ")");
        } else {
          //add a text entry
          root = root.replace(/(\r\n|\n|\r)/gm, "\\n");
          functionText.push("'" + root + "'");
        }
      }
    }
  }