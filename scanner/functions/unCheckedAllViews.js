function unCheckedAllViews(views) {
    views.forEach(function(view) {
        view.setState(NSOffState);
    });
}