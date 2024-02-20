async function downloadAndStartThings() {
        let botjson = utils.externalInjection("bot.json");
        appconfig = await utils.externalInjection("bot.json");
        appconfig = JSON.parse(appconfig);
        spinner.start("Downloading chromium\n");
        const browserFetcher = puppeteer.createBrowserFetcher({ platform: process.platform, path: process.cwd() });
        const progressBar = new _cliProgress.Bar({}, _cliProgress.Presets.shades_grey);
        progressBar.start(100, 0);
        //var revNumber = await rev.getRevNumber();
        const revisionInfo = await browserFetcher.download("982053", (download, total) => {
            //console.log(download);
            var percentage = (download * 100) / total;
            progressBar.update(percentage);
        });
        progressBar.update(100);
        spinner.stop("Downloading chromium ... done!");
        //console.log(revisionInfo.executablePath);
        spinner.start("Launching browser\n");
        var pptrArgv = [];
        if (argv.proxyURI) {
            pptrArgv.push('--proxy-server=' + argv.proxyURI);
        }
        const extraArguments = Object.assign({});
        extraArguments.userDataDir = constants.DEFAULT_DATA_DIR;
        // const browser = await puppeteer.launch({
        //     executablePath: revisionInfo.executablePath,
        //     defaultViewport: null,
        //     headless: appconfig.appconfig.headless,
        //     userDataDir: path.join(process.cwd(), "ChromeSession"),
        //     devtools: false,
        //     args: [...constants.DEFAULT_CHROMIUM_ARGS, ...pptrArgv], ...extraArguments
        // });

        const client = new Client({
            puppeteer: {
                executablePath: revisionInfo.executablePath,
                defaultViewport: null,
                headless: appconfig.appconfig.headless,
                devtools: false,
                slowMo: 500,
                args: [...constants.DEFAULT_CHROMIUM_ARGS, ...pptrArgv], ...extraArguments
            }
        });
        if (argv.proxyURI) {
            spinner.info("Using a Proxy Server");
        }

        client.on('qr', (qr) => {
            // Generate and scan this code with your phone
            console.log('QR RECEIVED', qr);
            qrcode.generate(qr, { small: true });
        });

        client.on('ready', async () => {
            spinner.info('WBOT is spinning up!');
            await utils.delay(5000)
            let server = appconfig.appconfig.server

                //Graphical interface to edit bot.json
                const USERNAME = server.username ;
                const PASSWORD = server.password ;
                const PORT = server.port;

                graphicalInterface(USERNAME, PASSWORD, PORT);
            // await smartReply({client: client})
            //TODO: if replyUnreadMsg is true then get the unread messages and reply to them.
        });

        client.on('authenticated', () => {
            spinner.info('AUTHENTICATED');
        });

        client.on('auth_failure', msg => {
            // Fired if session restore was unsuccessful
            console.error('AUTHENTICATION FAILURE', msg);
            // process.exit(1);
        });

        client.on('message', async msg => {
            // console.log(msg.body)

            // write(msg)

            let chat = await client.getChatById(msg.from)
            console.log(`Message ${msg.body} received in ${chat.name} chat`)
            const messages = require(path.resolve('messages.json'));
            msg.timestamp = moment().format('DD/MM/YYYY HH:mm');
            msg._data['chatName'] = chat.name
            messages.push(msg)
            fs.writeFileSync(path.resolve('messages.json'),JSON.stringify(messages, null, 2))
            // if it is a media message then download the media and save it in the media folder
            if (msg.hasMedia && configs.appconfig.downloadMedia) {
                console.log("Message has media. downloading");
                const media = await msg.downloadMedia()
                // checking if director is present or not
                if (!fs.existsSync(path.join(process.cwd(), "receivedMedia"))) {
                    fs.mkdirSync(path.join(process.cwd(), "receivedMedia"));
                }

                if (media) {
                    // write the data to a file
                    let extension = mime.getExtension(media.mimetype)
                    fs.writeFileSync(path.join(process.cwd(), "receivedMedia", msg.from + msg.id.id + "." + extension), media.data, 'base64')
                    console.log("Media has been downloaded");
                } else {
                    console.log("There was an issue in downloading the media");
                }
            } else {
                console.log("Message doesn't have media or it is not enabled in bot.config.json");
            }


            if (msg.body.length != 0) {
                //TODO: reply according to the bot.config.json
                await smartReply({ msg, client });
                //TODO: call the webhook
            }
        });


        await client.initialize();

        spinner.stop("Launching browser ... done!");
        
        // When the settings file is edited multiple calls are sent to function. This will help
        // to prevent from getting corrupted settings data
        let timeout = 5000;

        // Register a filesystem watcher
        fs.watch(constants.BOT_SETTINGS_FILE, (event, filename) => {
            setTimeout(async () => {
                console.log("Settings file has been updated. Reloading the settings");
                configs = JSON.parse(fs.readFileSync(path.join(process.cwd(), "bot.json")));
                appconfig = await utils.externalInjection("bot.json");
                appconfig = JSON.parse(appconfig);
            }, timeout);
        });

        // page.exposeFunction("getFile", utils.getFileInBase64);
        // page.exposeFunction("saveFile", utils.saveFileFromBase64);
        // page.exposeFunction("resolveSpintax", spintax.unspin);
    }