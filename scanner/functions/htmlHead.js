function htmlHead(details) {
    return `
<head>
    <title>Code coverage report for ${html.escape(details.entity)}</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="${html.escape(details.prettify.css)}" />
    <link rel="stylesheet" href="${html.escape(details.base.css)}" />
    <link rel="shortcut icon" type="image/x-icon" href="${html.escape(
        details.favicon
    )}" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style type='text/css'>
        .coverage-summary .sorter {
            background-image: url(${html.escape(details.sorter.image)});
        }
    </style>
</head>
    `;
}