function getWebviewContent(context, webview) {
    const cssPath = webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "media", "index.css"));
    const jsReactPath = webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "media", "build/static/js/main.js"));
    const cssReactPath = webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "media", "build/static/css/main.css"));
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cat Coding</title>
						<link href="${cssPath}" rel="stylesheet">
						<link href="${cssReactPath}" rel="stylesheet">
        </head>
        <body>
						<div id="send_message" class="display_none">webview向vscode发送信息</div>
						<div id="vscode_webview" class="display_none">vscode向webview发送信息</div>
    				<div id="root"></div>
						<script src="${jsReactPath}"></script>
        </body>
        </html>
    `;
}