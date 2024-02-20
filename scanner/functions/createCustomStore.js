function createCustomStore(key, store) {
  return m("div.option.custom-store", { class: "store-" + store.name }, [
    m("input[type=checkbox]", {
      title: "Whether to enable this password store",
      checked: store.enabled,
      onchange: function(e) {
        store.enabled = e.target.checked;
        saveSetting("customStores");
      }
    }),
    m("input[type=text].name", {
      title: "The name for this password store",
      value: store.name,
      placeholder: "name",
      onchange: function(e) {
        store.name = e.target.value;
        saveSetting("customStores");
      }
    }),
    m("input[type=text].path", {
      title: "The full path to this password store",
      value: store.path,
      placeholder: "/path/to/store",
      onchange: function(e) {
        store.path = e.target.value;
        saveSetting("customStores");
      }
    }),
    m(
      "a.remove",
      {
        title: "Remove this password store",
        onclick: function() {
          delete settings.customStores.value[key];
          saveSetting("customStores");
        }
      },
      "[X]"
    )
  ]);
}