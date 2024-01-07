function frameLoop() {
    getGlobalWorkerPool().commit();
    requestAnimFrame(frameLoop);
}