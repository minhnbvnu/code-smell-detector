function showSetCurrentChaosContainer() {
    $('#alert_placeholder2').text('');
    getCurrentChaosContainer();
    $('#setChaosContainerModal').modal('show');
    modal_opened = true;
  }