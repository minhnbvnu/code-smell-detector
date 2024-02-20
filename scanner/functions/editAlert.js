async function editAlert(alert_id, close=false) {

    const alertTag = $('#editAlertTags');
    const confirmAlertEdition = $('#confirmAlertEdition');

    alertTag.val($(`#alertTags-${alert_id}`).text())
    set_suggest_tags(`editAlertTags`);
    $('#editAlertNote').val($(`#alertNote-${alert_id}`).text());

    if (close) {
        confirmAlertEdition.text('Close alert');
        $('.alert-edition-part').hide();
        $('#closeAlertModalLabel').text(`Close alert #${alert_id}`);
    } else {
        $('.alert-edition-part').show();
        $('#closeAlertModalLabel').text(`Edit alert #${alert_id}`);
        confirmAlertEdition.text('Save')
    }

    fetchSelectOptions('editAlertClassification', selectsConfig['alert_classification_id']).then(() => {
      $('#editAlertClassification').val($(`#alertClassification-${alert_id}`).data('classification-id'));
    }).catch(error => {
      console.error(error);
    });

    fetchSelectOptions('editAlertSeverity', selectsConfig['alert_severity_id']).then(() => {
      $('#editAlertSeverity').val($(`#alertSeverity-${alert_id}`).data('severity-id'));
    }).catch(error => {
      console.error(error);
    });

   $('#editAlertModal').modal('show');

    confirmAlertEdition.off('click').on('click', function () {
        let alert_note = $('#editAlertNote').val();
        let alert_tags = alertTag.val();

        let data = {
          alert_note: alert_note,
          alert_tags: alert_tags,
          alert_resolution_status_id: getAlertResolutionId($("input[type='radio'][name='resolutionStatus']:checked").val()),
          alert_classification_id: $('#editAlertClassification').val(),
          alert_severity_id: $('#editAlertSeverity').val()
        };

        if (close) {
            data['alert_status_id'] = getAlertStatusId('Closed');
        }

        updateAlert(alert_id, data, true, true)
            .then(() => {
                $('#editAlertModal').modal('hide');
            });
    });
}