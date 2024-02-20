function previewContainer(e) {
    if(e.target.id === 'mobile-preview') {
        $('#PreviewTabContent .preview-tab').removeClass('desktop-preview');
        $('#PreviewTabContent .preview-tab').addClass('mobile-preview')
    } else {
        $('#PreviewTabContent .preview-tab').removeClass('mobile-preview');
        $('#PreviewTabContent .preview-tab').addClass('desktop-preview')
    }
}