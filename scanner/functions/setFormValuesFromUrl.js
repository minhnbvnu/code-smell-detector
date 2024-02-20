function setFormValuesFromUrl() {
  const queryParams = new URLSearchParams(window.location.search);
  const form = $('#alertFilterForm');
  const ajaxCalls = [];

  queryParams.forEach((value, key) => {
    const input = form.find(`[name="${key}"]`);
    if (input.length > 0) {
      if (input.prop('type') === 'checkbox') {
        input.prop('checked', value in ['true', 'y', 'yes', '1', 'on']);
      } else if (input.is('select') && selectsConfig[input.attr('id')]) {
        const ajaxCall = new Promise((resolve, reject) => {
          input.one('click', function () {
            fetchSelectOptions(input.attr('id'), selectsConfig[input.attr('id')]).then(() => {
              input.val(value);
              resolve();
            }).catch(error => {
              console.error(error);
              reject(error);
            });
          }).trigger('click');
        });
        ajaxCalls.push(ajaxCall);
      } else {
        input.val(value);
      }
    }
    if (key === 'filter_id') {
        $('#savedFilters').selectpicker('val', value);
        $('.preset-dropdown-container').show();
    }
  });

  Promise.all(ajaxCalls)
    .then(() => {
      form.trigger('submit');
    })
    .catch(error => {
      console.error('Error setting form values:', error);
    });
}