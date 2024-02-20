function createCheckbox(name, option) {
  return m("div.option", { class: name }, [
    m("input[type=checkbox]", {
      name: name,
      title: option.title,
      checked: option.value,
      onchange: function(e) {
        settings[name].value = e.target.checked;
        saveSetting(name);
      }
    }),
    m("label", { for: name }, option.title)
  ]);
}