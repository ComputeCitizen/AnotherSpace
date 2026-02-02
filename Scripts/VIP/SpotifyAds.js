/**
 * Spotify Ad-Blocker (Upsell Neutralizer)
 * 作用：拦截推销接口，输出日志，尝试消除 UI 占位符
 */

const url = $request.url;
const method = $request.method;

// 1. 输出捕获日志
console.log(`[🛡️ Spotify Block] 捕获请求: ${method} ${url}`);

// 2. 执行替换
// 策略变更：由 status:200 改为 status:204 (No Content)
// 目的：通知客户端该模块无数据，诱导 UI 引擎自动隐藏容器，解决“空方框”问题。
// 同时移除 Content-Type 防止 gRPC 解析器介入。
$done({
    status: 204,
    headers: {
        "X-Spotify-Block-By": "Stash-Script" // 注入标识头，方便抓包确认
    },
    body: ""
});

console.log(`[✅ Spotify Block] 已拦截并返回 204 No Content`);
