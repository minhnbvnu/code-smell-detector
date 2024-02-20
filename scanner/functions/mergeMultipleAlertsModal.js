function mergeMultipleAlertsModal() {
    const selectedAlerts = getBatchAlerts();
    const escalateButton = $("#escalateOrMergeButton");
    if (selectedAlerts.length === 0) {
        notify_error('Please select at least one alert to perform this action on.');
        return;
    }
    fetchMultipleAlerts(selectedAlerts)
        .then((alertDataReq) => {
            if (notify_auto_api(alertDataReq, true)) {
                const ioCsList = $("#ioCsList");
                    const assetsList = $("#assetsList");

                    // Configure the modal for both escalation and merging
                    $('#escalateModalLabel').text('Merge multiple alerts in a new case');
                    $('#escalateModalExplanation').text('These alerts will be merged into a new case. Set the case title and select the IOCs and Assets to escalate into the case.');
                    $('#modalAlertTitleContainer').hide();

                    $('#modalEscalateCaseTitle').val(`[ALERT] Escalation of ${selectedAlerts.length} alerts`);
                    $('#modalEscalateCaseTitleContainer').show();

                    escalateButton.attr("data-merge", false);
                    $('#mergeAlertCaseSelectSection').hide();

                    const case_tags = $('#case_tags');

                    case_tags.val('')
                    case_tags.amsifySuggestags({
                        printValues: false,
                        suggestions: []
                    });

                    // Load case options for merging
                    var options = {
                        ajax: {
                            url: '/context/search-cases' + case_param(),
                            type: 'GET',
                            dataType: 'json'
                        },
                        minLength: 0,
                        clearOnEmpty: false,
                        emptyRequest: true,
                        locale: {
                            emptyTitle: 'Select and Begin Typing',
                            statusInitialized: '',
                        },
                        preprocessData: function (data) {
                            return context_data_parser(data);
                        },
                        preserveSelected: false
                    };
                    get_request_api('/context/search-cases')
                        .done((data) => {
                            if (notify_auto_api(data, true)) {
                                mergeAlertCasesSelectOption(data);
                                $('#mergeAlertCaseSelect').ajaxSelectPicker(options);

                                get_request_api('/manage/case-templates/list')
                                .done((dataTemplate) => {
                                    if (notify_auto_api(dataTemplate, true)) {
                                        dataTemplate = dataTemplate.data;
                                        const templateSelect = $('#mergeAlertCaseTemplateSelect');
                                        templateSelect.html('');
                                        templateSelect.append('<option value="">Select a template</option>');
                                        for (let i = 0; i < dataTemplate.length; i++) {
                                            templateSelect.append(`<option value="${dataTemplate[i].id}">${filterXSS(dataTemplate[i].display_name)}</option>`);
                                        }
                                        templateSelect.selectpicker('refresh');

                                        // Clear the lists
                                        ioCsList.html("");
                                        assetsList.html("");

                                        let alertsData = alertDataReq.data;

                                        for (let i = 0; i < alertsData.length; i++) {
                                            let alertData = alertsData[i];
                                            if (alertData.iocs.length !== 0) {
                                                appendLabels(ioCsList, alertData.iocs, 'ioc');
                                            }
                                            if (alertData.assets.length !== 0) {
                                                appendLabels(assetsList, alertData.assets, 'asset');
                                            }
                                        }

                                        escalateButton.attr("data-merge", false);
                                        escalateButton.attr("data-multi-merge", true);
                                        $("#escalateOrMergeButton").attr('onclick',
                                            `mergeAlertClicked("${selectedAlerts.join(',')}");`);

                                        $('#escalateModal').modal('show');

                                        $("input[type='radio'][name='mergeOption']:checked").trigger("change");

                                        $("input[type='radio'][name='mergeOption']").off('change').on("change", function () {
                                            if ($(this).val() === "existing_case") {
                                                $('#escalateModalLabel').text(`Merge ${selectedAlerts.length} alerts in an existing case`);
                                                $('#escalateModalExplanation').text('These alerts will be merged into the selected case. Select the IOCs and Assets to merge into the case.');
                                                $('#mergeAlertCaseSelectSection').show();
                                                $('#mergeAlertCaseTemplateSection').hide();
                                                $('#modalEscalateCaseTitleContainer').hide();
                                                $('#mergeAlertCaseSelect').selectpicker('refresh');
                                                $('#mergeAlertCaseSelect').selectpicker('val', get_caseid());
                                                escalateButton.data("merge", true);
                                            } else {
                                                console.log('change')
                                                $('#escalateModalLabel').text(`Merge ${selectedAlerts.length} alerts in new case`);
                                                $('#escalateModalExplanation').text('This alert will be merged into a new case. Set the case title and select the IOCs and Assets to merge into the case.');
                                                $('#mergeAlertCaseSelectSection').hide();
                                                $('#mergeAlertCaseTemplateSection').show();
                                                $('#modalEscalateCaseTitleContainer').show();
                                                escalateButton.data("merge", false);
                                            }
                                        });
                                    }
                                });
                            }
                        });
            }
        });


}