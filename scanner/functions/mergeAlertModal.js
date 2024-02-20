function mergeAlertModal(alert_id) {

    const escalateButton = $("#escalateOrMergeButton");
    escalateButton.attr("data-alert-id", alert_id);

    let alertDataReq = null;
    const ioCsList = $("#ioCsList");
    const assetsList = $("#assetsList");

    fetchAlert(alert_id)
        .then((data) => {
            alertDataReq = data;
            notify_auto_api(data, true);
            let alert_title = filterXSS(alertDataReq.data.alert_title);

            $("#modalAlertId").val(alert_id);
            $("#modalAlertTitle").val(alert_title);

            // Configure the modal for both escalation and merging
            $('#escalateModalLabel').html(`Merge alert #${alert_id} in a new case`);
            $('#escalateModalLabel')[0].offsetHeight;

            $('#escalateModalExplanation').text('This alert will be escalated into a new case. Set a title and select the IOCs and Assets to escalate into the case.');

            $('#modalEscalateCaseTitle').val(`[ALERT] ${alert_title}`);
            $('#modalEscalateCaseTitleContainer').show();

            escalateButton.attr("data-merge", false);
            $('#mergeAlertCaseSelectSection').hide();

            const case_tags = $('#case_tags');

            case_tags.val(alertDataReq.data.alert_tags)
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
                    return context_data_parser(data, false);
                },
                preserveSelected: false
            };

            get_request_api('/context/search-cases')
            .done((data) => {
                if (notify_auto_api(data, true)) {
                    mergeAlertCasesSelectOption(data);
                    $('#mergeAlertCaseSelect').ajaxSelectPicker(options);

                    get_request_api('/manage/case-templates/list')
                    .done((data) => {
                        if (notify_auto_api(data, true)) {
                            data = data.data;
                            const templateSelect = $('#mergeAlertCaseTemplateSelect');
                            templateSelect.html('');
                            templateSelect.append('<option value="">Select a template</option>');
                            for (let i = 0; i < data.length; i++) {
                                templateSelect.append(`<option value="${data[i].id}">${filterXSS(data[i].display_name)}</option>`);
                            }
                            templateSelect.selectpicker('refresh');

                            // Clear the lists
                            ioCsList.html("");
                            assetsList.html("");

                            if (!notify_auto_api(alertDataReq, true)) {
                                return;
                            }

                            let alertData = alertDataReq.data;

                            if (alertData.iocs.length !== 0) {
                                appendLabels(ioCsList, alertData.iocs, 'ioc');
                                $("#toggle-iocs").off("click").on("click", function () {
                                    toggleSelectDeselect($(this), "#ioCsList input[type='checkbox']");
                                });
                                $("#ioc-container").show();
                            } else {
                                $("#ioc-container").show();
                            }

                            if (alertData.assets.length !== 0) {
                                appendLabels(assetsList, alertData.assets, 'asset');
                                $("#toggle-assets").off("click").on("click", function () {
                                    toggleSelectDeselect($(this), "#assetsList input[type='checkbox']");
                                });
                                $("#asset-container").show();
                            } else {
                                $("#asset-container").hide();
                            }


                            $("input[type='radio'][name='mergeOption']:checked").trigger("change");

                            $("input[type='radio'][name='mergeOption']").off("change").on("change", function () {
                                if ($(this).val() === "existing_case") {
                                    $('#escalateModalLabel').text(`Merge alert #${alert_id} in existing case`);
                                    $('#escalateModalExplanation').text('This alert will be merged into the selected case. Select the IOCs and Assets to merge into the case.');
                                    $('#mergeAlertCaseSelectSection').show();
                                    $('#mergeAlertCaseTemplateSection').hide();
                                    $('#modalEscalateCaseTitleContainer').hide();
                                    $('#mergeAlertCaseSelect').selectpicker('refresh');
                                    $('#mergeAlertCaseSelect').selectpicker('val', get_caseid());
                                    escalateButton.data("merge", true);
                                } else {
                                    $('#escalateModalLabel').text(`Merge alert #${alert_id} in new case`);
                                    $('#escalateModalExplanation').text('This alert will be merged into a new case. Set the case title and select the IOCs and Assets to merge into the case.');
                                    $('#mergeAlertCaseSelectSection').hide();
                                    $('#mergeAlertCaseTemplateSection').show();
                                    $('#modalEscalateCaseTitleContainer').show();
                                    escalateButton.data("merge", false);
                                }
                            });

                            $("#escalateOrMergeButton").attr('onclick',
                                `mergeAlertClicked(${alert_id});`);

                            $("#escalateModal").modal("show");
                        }
                    });
                }
            });


        });

}