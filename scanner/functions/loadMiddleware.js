function loadMiddleware(app) {
	// Compression
	app.express.use(compression());

	// Adds an ID to every request, used later for logging
	app.express.use(addRequestId);

	// Logging middleware
	morgan.token('id', request => {
		return request.id;
	});

	// Log the start of all HTTP requests
	const startLog = '[:date[iso] #:id] Started :method :url for :remote-addr';
	// Immediate: true is required to log the request
	//  before the response happens
	app.express.use(morgan(startLog, {immediate: true}));

	// Log the end of all HTTP requests
	const endLog = '[:date[iso] #:id] Completed :status :res[content-length] in :response-time ms';
	app.express.use(morgan(endLog));

	// Public files
	app.express.use(express.static(`${__dirname}/public`, {
		maxAge: (process.env.NODE_ENV === 'production' ? 604800000 : 0)
	}));

	// General express config
	app.express.disable('x-powered-by');
	app.express.use(bodyParser.urlencoded({
		extended: true
	}));
}