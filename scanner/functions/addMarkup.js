function addMarkup(){
    var buttons = Object.keys(languages)
        .sort()
        .map(function(code) {
            var fullName = languages[code];
            return '<div class="language-button" data-language="'+code+'">'+fullName+'</div>';
        });

    $('.language-picker .container').html( buttons.join(' ') );

    $('.language-button').click(function(){
       setLang( $(this).data('language') );
    });

    $('#curr-lang').text( languages[document.webL10n.getLanguage()] );

    $('.language-title').mousedown(function(){
        $('.language-picker').toggleClass('active');
        $('.language-title').toggleClass('active');
    });



}