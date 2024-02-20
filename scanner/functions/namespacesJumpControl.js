function namespacesJumpControl() {
    if (namespacesJumpFlag) {
        namespacesJumpFlag = false;
        $("#namespacesJumpButton").text("Enable Auto NS Switch");
        $('#alert_placeholder').replaceWith(alert_div + 'Latest action: Disabled automatic switch of namespace</div>');
        namespacesJumpStatus = 'Disabled'
    } else {
        namespacesJumpFlag = true;
        $("#namespacesJumpButton").text("Disable Auto NS Switch");
        $('#alert_placeholder').replaceWith(alert_div + 'Latest action: Enabled automatic switch of namespace </div>');
        namespacesJumpStatus = 'Enabled'
    }
}