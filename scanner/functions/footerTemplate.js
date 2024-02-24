function footerTemplate(details) {
    return `
                <div class='push'></div><!-- for sticky footer -->
            </div><!-- /wrapper -->
            <div class='footer quiet pad2 space-top1 center small'>
                Code coverage generated by
                <a href="https://istanbul.js.org/" target="_blank" rel="noopener noreferrer">istanbul</a>
                at ${html.escape(details.datetime)}
            </div>
        <script src="${html.escape(details.prettify.js)}"></script>
        <script>
            window.onload = function () {
                prettyPrint();
            };
        </script>
        <script src="${html.escape(details.sorter.js)}"></script>
        <script src="${html.escape(details.blockNavigation.js)}"></script>
    </body>
</html>
    `;
}