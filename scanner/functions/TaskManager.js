function TaskManager() {
    this.task_no = 0;
    this.time_tag = "start_time";
    this.wait_time = 15000;

    this.init = function () {
        engines.myEngine().setTag(this.time_tag, (new Date()).getTime());

        var task_list = this.getTaskList();
        this.task_no = this.findIndex(engines.myEngine(), task_list);
        log(Object.keys(task_list));
    };

    this.getTaskList = function () {
        return engines.all().sort(function(e1, e2) {
            return e1.getTag(this.time_tag) - e2.getTag(this.time_tag);
        }.bind(this));
    };
    
    this.findIndex = function (engine, list) {
        var engine_id = engine.id;
        var id_list = list.map(function (o) {
            return o.id;
        });
        
        return id_list.indexOf(engine_id);
    };

    this.listen = function() {
        // 子线程
        threads.start(function () {
            // 监听音量上键
            events.observeKey();
            events.onceKeyDown("volume_up", function (event) {
                engines.stopAll();
                exit();
            });
        });
    };

    this.waitFor = function () {
        while (1) {
            device.wakeUpIfNeeded();
            
            var task_no = this.findIndex(engines.myEngine(), this.getTaskList());
            if (task_no > 0) {
                log("任务" + this.task_no + "排队中，前面有" + task_no + "个任务");
                sleep(this.wait_time);
            } else {
                log("任务" + this.task_no + "开始运行");
                break;
            }
        }
    };
}