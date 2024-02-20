function fetchSelectOptions(selectElementId, configItem) {
  return new Promise((resolve, reject) => {
    get_request_api(configItem.url)
      .then(function (data) {
        if (!notify_auto_api(data, true)) {
          reject('Failed to fetch options');
          return;
        }
        const selectElement = $(`#${selectElementId}`);
        selectElement.empty();
        selectElement.append($('<option>', {
          value: null,
          text: ''
        }));
        if (selectElementId === 'alert_owner_id') {
            selectElement.append($('<option>', {
                value: '-1',
                text: 'Unassigned'
            }));
        }

        data.data.forEach(function (item) {
          selectElement.append($('<option>', {
            value: item[configItem.id],
            text: item[configItem.name]
          }));
        });
        resolve();
      });
  });
}