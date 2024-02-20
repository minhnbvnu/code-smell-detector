function closeBatchAlerts() {
    const alertTag = $('#editAlertTags');
    const confirmAlertEdition = $('#confirmAlertEdition');
    $('#editAlertNote').val('');
    alertTag.val('');

    confirmAlertEdition.text('Close alerts');
    $('.alert-edition-part').hide();
    $('#closeAlertModalLabel').text(`Close multiple alerts`);

    $('#editAlertModal').modal('show');

    confirmAlertEdition.off('click').on('click', function () {
        let alert_note = $('#editAlertNote').val();
        let alert_tags = alertTag.val();

        let data = {
          alert_note: alert_note,
          alert_tags: alert_tags,
          alert_resolution_status_id: getAlertResolutionId($("input[type='radio'][name='resolutionStatus']:checked").val()),
        };

        if (close) {
            data['alert_status_id'] = getAlertStatusId('Closed');
        }

        updateBatchAlerts(data)
            .then(() => {
                $('#editAlertModal').modal('hide');
            });
    });

}