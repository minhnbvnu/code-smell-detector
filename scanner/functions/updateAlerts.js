async function updateAlerts(page, per_page, filters = {}, paging=false){
  if (sortOrder === undefined) { sortOrder = 'desc'; }

  if (paging) {
      filters = getFiltersFromUrl();
  }

  const alertsContainer = $('.alerts-container');
  alertsContainer.html('<h4 class="ml-auto mr-auto">Retrieving alerts...</h4>');

  const filterString = objectToQueryString(filters);
  const data = await fetchAlerts(page, per_page, filterString, sortOrder);

  if (!notify_auto_api(data, true)) {
    return;
  }
  const alerts = data.data.alerts;

  if (modulesOptionsAlertReq === null) {
    modulesOptionsAlertReq = await fetchModulesOptionsAlert();
    if (!notify_auto_api(modulesOptionsAlertReq, true)) {
        return;
    }
  }
  if (modulesOptionsIocReq === null) {
    modulesOptionsIocReq = await fetchModulesOptionsIoc();
    if (!notify_auto_api(modulesOptionsIocReq, true)) {
        return;
    }
  }

  // Check if the selection mode is active
   const selectionModeActive = $('body').hasClass('selection-mode');
   selectionModeActive ? $('body').removeClass('selection-mode') : '';
   $('#toggle-selection-mode').text('Select');
   $('body').removeClass('selection-mode');
   $('#select-deselect-all').hide();
   $('#alerts-batch-actions').hide();

  // Clear the current alerts list
  const queryParams = new URLSearchParams(window.location.search);
  const isExpanded = queryParams.get('is-expanded') === 'true';

  alertsContainer.html('');
  if (alerts.length === 0) {
    // Display "No results" message when there are no alerts
    alertsContainer.append('<div class="ml-auto mr-auto">No results</div>');
  } else {

      // Add the fetched alerts to the alerts container
      alerts.forEach((alert) => {
          const alertElement = $('<div></div>');

          const alertHtml = renderAlert(alert, isExpanded, modulesOptionsAlertReq.data,
                                               modulesOptionsIocReq.data);
          alertElement.html(alertHtml);
          alertsContainer.append(alertElement);
      });
  }

  // Update the pagination links
  const currentPage = page;
  const totalPages = Math.ceil(data.data.total / per_page);
  createPagination(currentPage, totalPages, per_page, 'updateAlerts', '.pagination-container');

  // Update the URL with the filter parameters
  queryParams.set('page', page);
  queryParams.set('per_page', per_page);
  let filter_tags_info = [];

  for (const key in filters) {
    if (filters.hasOwnProperty(key)) {
      if (filters[key] === '') {
        queryParams.delete(key);
      } else {
        queryParams.set(key, filters[key]);
        filter_tags_info.push(`  
          <span class="badge badge-light">
            <i class="fa-solid fa-magnifying-glass mr-1"></i>${key}: ${filterXSS(filters[key])}
            <span class="tag-delete-alert-filter" data-filter-key="${key}" style="cursor: pointer;" title="Remove filter"><i class="fa-solid fa-xmark ml-1"></i></span>
          </span>
        `)
      }
    }
  }

  queryParams.set('sort', sortOrder);

  history.replaceState(null, null, `?${queryParams.toString()}`);

  $('#alertsInfoFilter').text(`${data.data.total} Alert${ data.data.total > 1 ? 's' : ''} ${ filterString ? `(filtered)` : '' }`);

  if (filter_tags_info) {
    $('#alertsInfoFilterTags').html(filter_tags_info.join(' + '));
    $('#alertsInfoFilterTags .tag-delete-alert-filter').on('click', function () {
      const filterKey = $(this).data('filter-key');
      delete filters[filterKey];
      queryParams.delete(filterKey);
      $(`#${filterKey}`).val('');

      resetSavedFilters(queryParams, false);

      history.replaceState(null, null, `?${queryParams.toString()}`);
      updateAlerts(page, per_page, filters);
    });
  } else {
    $('#alertsInfoFilterTags').html('');
  }

  filterString || queryParams.get('filter_id') ? $('#resetFilters').show() : $('#resetFilters').hide();

  alertsContainer.show();
}