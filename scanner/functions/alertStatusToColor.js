function alertStatusToColor(status) {
    switch (status) {
        case 'Closed':
            return 'alert-card-done';
        case 'Dismissed':
            return 'alert-card-done';
        case 'Merged':
            return 'alert-card-done';
        case 'Escalated':
            return 'alert-card-done';
        case 'New':
            return 'alert-card-new';
        default:
            return '';
    }
}