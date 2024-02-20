function showRuler(document) {
    if (!document.isRulersVisible()) {
        var toggleRulersAction = document.actionsController().actionForID("MSToggleRulersAction");
        if(toggleRulersAction.validate()) {
            toggleRulersAction.performAction(nil);
        }
    }
}