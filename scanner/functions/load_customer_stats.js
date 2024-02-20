function load_customer_stats(customer_id) {
    get_request_api('/manage/customers/' + customer_id + '/cases')
    .done((data) => {
        if(notify_auto_api(data, true)) {
            $('#last_month_cases').text(data.data.stats.cases_last_month);
            $('#last_year_cases').text(data.data.stats.cases_last_year);
            $('#cases_last_month').text(data.data.stats.cases_last_month);
            $('#cases_current_month').text(data.data.stats.cases_current_month);
            $('#cases_current_year').text(data.data.stats.cases_current_year);
            $('#current_open_cases').text(data.data.stats.open_cases);
            $('#cases_total').text(data.data.stats.cases_total);
            $('#ratio_year').text(data.data.stats.ratio_year);
            $('#average_case_duration').text(data.data.stats.average_case_duration);

            if (data.data.stats.ratio_year > 0) {
                $('#ratio_year').addClass('text-warning');
                $('#ratio_year').html(`+${data.data.stats.ratio_year}% <i class="ml-1 fa fa-chevron-up"></i>`);
            } else if (data.data.stats.ratio_year < 0) {
                $('#ratio_year').addClass('text-success');
                $('#ratio_year').html(`${data.data.stats.ratio_year}% <i class="ml-1 fa fa-chevron-down"></i>`);
            }

            if (data.data.stats.ratio_month > 0) {
                $('#ratio_month').addClass('text-warning');
                $('#ratio_month').html(`+${data.data.stats.ratio_month}% <i class="ml-1 fa fa-chevron-up"></i>`);
            } else if (data.data.stats.ratio_month < 0) {
                $('#ratio_month').addClass('text-success');
                $('#ratio_month').html(`${data.data.stats.ratio_month}% <i class="ml-1 fa fa-chevron-down"></i>`);
            }

            $('#last_year').text(data.data.stats.last_year);

        }
    });
}