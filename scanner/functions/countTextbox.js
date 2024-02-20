function countTextbox(){
    var textboxElement = document.getElementById('textbox');
    var textboxText = textboxElement.innerText || textboxElement.textContent;
    var count = countWords(textboxText);
      
    var wordcountText = document.webL10n.get('wordcount', {n: count});
    wordcountText = wordcountText.replace(/(\d+)/, (n) => {
        return `<span class="word-count-number">${n}</span>`;
    });
    document.querySelector('.wc-text').innerHTML = wordcountText;
}