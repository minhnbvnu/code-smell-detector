function extractCss() {
    fs.readFile(config.build.index, 'utf8', (err, data) => {
        if (err) {
            throw err
        }
        const $ = cheerio.load(data)
        const cssUrls = findSync(cssPath)

        //插入行内js
        // console.log(cssUrls)
        $('head').append(`<script>var themeURL = ${JSON.stringify(cssUrls)}</script>`)

        fs.writeFile(config.build.index, $.html(), err => {
            if (err) {
                throw err
            }
            console.log(chalk.cyan('  css theme rewrite complete.\n'))
        })
    })
}