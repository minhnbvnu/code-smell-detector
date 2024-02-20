function view() {
  var results = "";

  if (searching) {
    results = m("div.loader");
  } else if (error) {
    results = m("div.status-text", "Error: " + error);
    error = undefined;
  } else if (logins) {
    if (logins.length === 0 && domain && domain.length > 0) {
      results = m(
        "div.status-text",
        m.trust(`No matching passwords found for <strong>${domain}</strong>.`)
      );
    } else if (logins.length > 0) {
      results = logins.map(function(login) {
        let selector = "button.login";
        let options = {
          onclick: getLoginData.bind(login),
          title:
            "Fill form" +
            (searchSettings && searchSettings.autoSubmit ? " and submit" : "")
        };

        var store = "default";
        var storeTitle = "Default password store";
        var name = login;
        var loginStoreSplitterIndex = login.indexOf(":");
        if (loginStoreSplitterIndex > -1) {
          if (searchSettings && searchSettings.customStores.length > 1) {
            store = login.substr(0, loginStoreSplitterIndex);
            for (let i = 0; i < searchSettings.customStores.length; i++) {
              let customStore = searchSettings.customStores[i];
              if (customStore.name == store) {
                storeTitle = customStore.path;
                break;
              }
            }
          }
          name = login.substr(loginStoreSplitterIndex + 1);
        }

        let faviconUrl = getFaviconUrl(domain);
        if (faviconUrl) {
          selector += ".favicon";
          options.style = `background-image: url('${faviconUrl}')`;
        }

        return m("div.entry", [
          m(selector, options, [
            loginStoreSplitterIndex > -1 && store != "default"
              ? m("div.store", { title: storeTitle }, store)
              : null,
            m("div.name", name)
          ]),
          m("button.launch.url", {
            onclick: launchURL.bind({ entry: login }),
            title: "Visit URL",
            tabindex: -1
          }),
          m("button.copy.username", {
            onclick: loginToClipboard.bind({ entry: login, what: "username" }),
            title: "Copy username",
            tabindex: -1
          }),
          m("button.copy.password", {
            onclick: loginToClipboard.bind({ entry: login, what: "password" }),
            title: "Copy password",
            tabindex: -1
          }),
          m("button.copy.otp", {
            onclick: loginToClipboard.bind({ entry: login, what: "otp" }),
            title: "Copy OTP code",
            tabindex: -1
          })
        ]);
      });
    }
  }

  return m("div.container", { onkeydown: keyHandler }, [
    // search form
    m("div.search", [
      m(
        "form",
        {
          onsubmit: submitSearchForm,
          onkeydown: searchKeyHandler
        },
        [
          m("div", {
            id: "filter-search"
          }),
          m("div", [
            m("input", {
              type: "text",
              id: "search-field",
              name: "s",
              placeholder: "Search passwords...",
              autocomplete: "off",
              autofocus: "on",
              oninput: filterLogins
            }),
            m("input", {
              type: "submit",
              value: "Search",
              style: "display: none;"
            })
          ])
        ]
      )
    ]),

    // results
    m("div.results", results)
  ]);
}