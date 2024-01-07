constructor() {
        // list of workers with: [[0 jobs], [1 job], [2 jobs]]
        this.workers = [[], [], []];
        this.jobId = 0;
        this.jobQueue = [];
        this.jobCallbacks = new Map();
        this.run = (worker, job) => {
            worker.postMessage({
                type: 'decodeMesh',
                jobId: job.jobId,
                buffer: job.buffer
            }, [job.buffer]);
        };
    }