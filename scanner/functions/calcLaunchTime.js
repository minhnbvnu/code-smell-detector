function calcLaunchTime(arr,k) {
  // 1. 生成依赖关系图
  let obj = {}
  arr.forEach((row,i)=>{
    if(i+1>k){return}
    // id:任务id
    // next:下一步的任务
    // cost:任务的执行时间
    // in: 有几个任务依赖它
    // time:任务开始时间
    obj[i] = {id:i,next:new Set(),cost:row[i],in:0,time:0}
    row.forEach((col,j)=>{
      if(i!==j && col===1){
        obj[j].next.add(i)
        obj[i].in++
      }
    })
  })
  // 就像webpack里的文件关系，入口文件->next的关系
  // 完成的任务 用来统计时间
  let compltes = []
  // in是0的 说明没有前置任务，可以并行启动
  while(true){
    let ready = []
    for(let i in obj){
      // 入口节点可能不止一个，找到他 in是0的意思，就是没有任务的.next是他
      // 没有前置任务，直接启动
      if(obj[i].in===0){
        ready.push(obj[i])
      }
    }
    if(ready.length===0){
      break // 没有可以启动的任务
    }
    // 打印一下并行的任务
    // console.log(ready.map(v=>v.id))
    ready.forEach(task=>{
      task.next.forEach(nextTask=>{
        // 任务挨个执行
        let next = obj[nextTask]
        // next的依赖项-1 等于0的话，就可以启动了
        next.in--
        // 任务的开始时间 = max(前置任务的结束时间，当前任务的开始时间)
        next.time = Math.max(task.time+task.cost,next.time)
      })
    })
    ready.forEach(task=>{
      delete obj[task.id]
      compltes.push(task)
    })
  }
  const ret = Math.max(...compltes.map(task=>task.time+task.cost))
  return ret
}