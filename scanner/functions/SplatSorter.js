constructor() {
        super();

        this.worker = new Worker(URL.createObjectURL(new Blob([`(${SortWorker.toString()})()`], {
            type: 'application/javascript'
        })));

        this.worker.onmessage = (message) => {
            const newData = message.data.data;
            const oldData = this.vertexBuffer.storage;

            // send vertex storage to worker to start the next frame
            this.worker.postMessage({
                data: oldData
            }, [oldData]);

            // update vertex buffer data in the next event cycle so the above postMesssage
            // call is queued before the relatively slow setData call below is invoked
            setTimeout(() => {
                this.vertexBuffer.setData(newData);
                this.fire('updated');
            });
        };
    }