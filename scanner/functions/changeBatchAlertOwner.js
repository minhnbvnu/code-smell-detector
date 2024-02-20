async function changeBatchAlertOwner(alertId) {

    const selectedAlerts = getBatchAlerts();
    if (selectedAlerts.length === 0) {
        notify_error('Please select at least one alert to perform this action on.');
        return;
    }

      // Fetch the user list from the endpoint
      const usersReq = await get_request_api('/manage/users/restricted/list');

      if (!notify_auto_api(usersReq, true)) { return; };

      users = usersReq.data;

      // Populate the select element with the fetched user list
      const userSelect = $('#changeOwnerAlertSelect');
      userSelect.empty();
      users.forEach((user) => {
        userSelect.append(`<option value="${user.user_id}">${user.user_name}</option>`);
      });

      $('#alertIDAssignModal').text(alertId);

      // Show the modal
      $('#changeAlertOwnerModal').modal('show');

      // Set up the form submission
      document.getElementById('assign-owner-button').onclick = async () => {
          // Get the selected user ID
          const newOwnerId = userSelect.val();

          // Send a POST request to the update endpoint
          updateBatchAlerts({alert_owner_id: newOwnerId})
          .then(() => {
                // Close the modal
                $('#changeAlertOwnerModal').modal('hide');
          });
      };
}