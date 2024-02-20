function connectWebSocket() {
  // 创建 WebSocket 连接，适配服务端
  socket = new WebSocket("ws://127.0.0.1:5000");

  // 当连接建立时触发
  socket.addEventListener("open", event => {
      console.log("ws连接打开");

      // 向服务器发送一条消息
      // socket.send("ws连接成功");
  });

  // 当收到消息时触发
  socket.addEventListener("message", event => {
      console.log("收到服务器数据:", event.data);
  });

  // 当连接关闭时触发
  socket.addEventListener("close", event => {
      console.log("WS连接关闭");

      // 重连
      setTimeout(() => {
          connectWebSocket();
      }, 1000); // 延迟 1 秒后重连
  });
}