function textCountData() {
    if (selectedAccountIds.length > 0) {
        $("#errorText1").text('');
        let count = "";
        if (twitter > 0 && facebook === 0 && linkedin === 0 && instagram === 0 && tumblr=== 0) count = 280;
        else if (facebook > 0 && twitter === 0 && linkedin === 0 && instagram === 0) count = 5000;
        else if (linkedin > 0 && twitter === 0 && facebook === 0) count = 700;
        else if (twitter > 0 && facebook > 0 && linkedin === 0) count = 280;
        else if (twitter > 0 && linkedin > 0 && facebook === 0) count = 280;
        else if (facebook > 0 && linkedin > 0 && twitter === 0) count = 700;
        else if (twitter > 0 && facebook > 0 && linkedin > 0) count = 280;
        else if (twitter === 0 && facebook === 0 && linkedin === 0 && instagram > 0) count = 2200;
        else if (twitter === 0 && facebook === 0 && linkedin === 0 && instagram === 0 && tumblr > 0) count = 2200;
        else if (twitter === 0 && facebook > 0 && linkedin === 0 && instagram > 0 && tumblr === 0) count = 2200;
        else if (twitter > 0 && facebook === 0 && linkedin === 0 && instagram > 0) count = 280;
        else if (twitter === 0 && facebook > 0 && linkedin === 0 && instagram > 0 && tumblr > 0) count = 2200;
        if (Number($(".emojionearea-editor").text().length) <= count) {
            descriptionText = $(".emojionearea-editor").text();
        } else {
            $(".emojionearea-editor").text(descriptionText.substring(0, count));
        }
        let charCount = $(".emojionearea-editor").text().length;
        $("#errorText3").text(charCount + "/" + count);
    } else {
        $("#errorText3").text('');
        $(".emojionearea-editor").text(descriptionText);
        $(".emojionearea-editor").text('');
        $("#errorText1").text('please select atleast one social account .');
    }
}