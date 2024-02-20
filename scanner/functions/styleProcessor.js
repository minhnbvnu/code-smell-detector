function styleProcessor(type = 'css', { ssr=false, modules=false }={}) {
    // 各类型 Style 的 Loader 配置项
	let styleLoader = { loader: 'style-loader' }
	if (ssr) {
		styleLoader =  MiniCssExtractPlugin.loader
	}
    const cssLoader = {
        loader: 'css-loader',
        options: modules ? {
            modules: true,
            importLoaders: true,
            localIdentName: '[local]__[hash:base64:5]',
        } : {}
    }
    const lessLoader = {
    	loader: 'less-loader'
    }
    const postcssLoader =  {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: (loader) => [
                require('autoprefixer')()
            ]
        }
    }

    // 根据传入的配置返回不同的组合
	if(type === 'css') {
		return [styleLoader, cssLoader, postcssLoader]
	}
	if(type === 'less') {
		return [styleLoader, cssLoader, postcssLoader, lessLoader]
	}
}