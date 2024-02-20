async function fetchSavedFilters() {
    const url = '/filters/alerts/list';
    return get_request_api(url)
        .then((data) => {
            if (notify_auto_api(data, true)) {
                const savedFiltersDropdown = $('#savedFiltersDropdown');

                savedFiltersDropdown.empty();

                let dropdownHtml = `
                    <select class="selectpicker ml-2" data-style="btn-sm" data-live-search="true" title="Select preset filter" id="savedFilters">
                `;

                data.data.forEach(filter => {
                    let filter_name = filterXSS(filter.filter_name);
                    dropdownHtml += `
                                <option value="${filter.filter_id}" data-content='<div class="d-flex align-items-center"><span>${filter_name} ${filter.filter_is_private ? '(private)' : ''}</span><div class="trash-wrapper hidden-trash"><i class="fas fa-trash delete-filter text-danger" id="dropfilter-id-${filter.filter_id}" title="Delete filter"></i></div></div>'>${filter_name}</option>
                    `;
                });

                dropdownHtml += '</select>';

                savedFiltersDropdown.append(dropdownHtml);

                // Initialize the bootstrap-select component
                $('#savedFilters').selectpicker();

                // Add the event listener after the selectpicker is loaded
                $('#savedFilters').on('shown.bs.select', function () {
                    $('.trash-wrapper').removeClass('hidden-trash');
                    $('.delete-filter').off().on('click', function (event) {
                        event.preventDefault();
                        event.stopPropagation();

                        const filterId = $(this).attr('id').split('-')[2];

                        if (!filterId) return;

                        do_deletion_prompt(`Are you sure you want to delete filter #${filterId}?`, true)
                            .then((do_delete) => {
                                if (!do_delete) return;
                                const url = `/filters/delete/${filterId}`;
                                const data = {
                                    csrf_token: $('#csrf_token').val()
                                };
                                post_request_api(url, JSON.stringify(data))
                                    .then((data) => {
                                        if (notify_auto_api(data)) {
                                            fetchSavedFilters();
                                        }
                                    });
                        });
                    });
                }).on('hide.bs.select', function () {
                    $('.trash-wrapper').addClass('hidden-trash');
                });

                $('#savedFilters').on('change', function() {

                    const selectedFilterId = $('#savedFilters').val();
                    if (!selectedFilterId) return;

                    const url = `/filters/${selectedFilterId}`;

                    get_request_api(url)
                        .then((data) => {
                            if(!notify_auto_api(data, true)) return;
                            const queryParams = new URLSearchParams();
                            Object.entries(data.data.filter_data).forEach(([key, value]) => {
                                if (value !== '') {
                                    queryParams.set(key, value);
                                }
                            });

                            queryParams.set('filter_id', selectedFilterId);

                            // Update the URL and reload the page with the new filter settings
                            window.location.href = window.location.pathname + case_param() + '&' + queryParams.toString();
                        })
                });
            }
        });
}