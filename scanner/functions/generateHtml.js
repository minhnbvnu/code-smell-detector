function generateHtml(arr){
  console.log(arr)
  const filename = '简历格式生成.html'
  const ret = arr.map(item=>{
    if(item==='-'){
      return `<div class="item block"></div>`
    }else{
      console.log(item)
      return `<div class="flex">
        ${item.map(v=>`<div class="item" style="flex:${v}"></div>`).join('')}
      </div>`
    }
  })
  const tmpl = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
      .item{
        height:40px;
        margin:10px 0;
        padding:10px;
        justify-content:center;
        border:1px black solid;
      }
      .flex{
        display:flex;
      }
    </style>
  </head>
  <body>
    <div>
    ${ret.join('\n')}
    </div>

  </body>
  </html>`
  let p = path.resolve(__dirname,filename)
  fs.writeFileSync(p,tmpl,'utf-8'  )
}