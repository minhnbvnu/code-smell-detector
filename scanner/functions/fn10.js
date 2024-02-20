function fn10() {

    class MyKoa extends Object {
        constructor(props) {
            super(props);
            
            // 存储所有的中间件
            this.middlewares = []
        }

        // 注入中间件
        use (generator) {
            this.middlewares.push(generator)
        }

        // 执行中间件
        listen () {
            this._run()
        }

        _run () {
            const ctx = this
            const middlewares = ctx.middlewares
            co(function* () {
                let prev = null
                let i = middlewares.length
                //从最后一个中间件到第一个中间件的顺序开始遍历
                while (i--) {
                    //实际koa的ctx应该指向server的上下文，这里做了简化
                    //prev 将前面一个中间件传递给当前中间件
                    prev = middlewares[i].call(ctx, prev);
                }
                //执行第一个中间件
                yield prev;
            })
        }
    }

    // 实验效果
    var app = new MyKoa();
    app.use(function *(next){
        this.body = '1';
        yield next;
        this.body += '5';
        console.log(this.body);
    });
    app.use(function *(next){
        this.body += '2';
        yield next;
        this.body += '4';
    });
    app.use(function *(next){
        this.body += '3';
    });
    app.listen();

}