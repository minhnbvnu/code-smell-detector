function revokeOldUrls(urls){urls.forEach((function(url){url.startsWith("blob:")&&URL.revokeObjectURL(url)}))}