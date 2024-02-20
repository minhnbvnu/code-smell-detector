function addDocsToPanel(start,end){
    $('.more-backups').remove();
    var allDocs = listFiles();
    const docs = allDocs.slice(start,end);
    for (var i = 0; i < docs.length; i++) {
        try {
            $('.backup-window').append( generateBlock(docs[i]) );
        } catch (e) {
            // problem with that backup; ignore
        }
    }
    if (allDocs[end]) {
        var loadMoreText = document.webL10n.get('more-backups');
        const moreBackupsEl = $(`
            <div class="more-backups"
                data-start=${end} 
                data-end=${end+8} 
            >
                ${loadMoreText}
            </div>
        `);
        moreBackupsEl.click(function() {
            const {start, end} = this.dataset;
            addDocsToPanel(start, end);
        });
        
        $('.backup-window').append( moreBackupsEl );
    }
}