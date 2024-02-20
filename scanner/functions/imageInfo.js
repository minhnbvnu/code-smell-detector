function imageInfo(env, url, title, rating, createdDate, type, size) {
    $('#imageDiv').empty().append('<img src="' + env + url + '" alt="image" class="img-fluid">');
    $('#title_id').empty().append(title);
    $('#model_header').empty().append('<h5 class="modal-title" id="imageGalleryInfoLabel">' + title + '</h5>' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
        '                        <i aria-hidden="true" class="ki ki-close"></i>\n' +
        '                    </button>');
    $('#size_id').empty().append(Number(size)/(1024*1024) + ' MB');
    var gmtDateTime = moment.utc(createdDate, "YYYY-MM-DD h:mm:ss")
    var local = gmtDateTime.local().format('YYYY-MMM-DD h:mm:ss A');
    $('#create_date').empty().append(local);
    $('#type').empty().append(type);
    $('#ratng').empty().append('<i class="fas fa-star">' + rating + '</i></b></span>');

}