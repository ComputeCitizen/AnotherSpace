/**
 * Spotify Ad-Blocker (Error Trigger)
 * 策略：返回 404/503 错误，尝试诱导客户端隐藏 UI 组件
 */

const url = $request.url;
const method = $request.method;

console.log(`[🧪 Spotify Test] 捕获请求: ${method} ${url}`);

// 尝试返回 404 Not Found
// 如果 404 不行，你可以手动改成 503 试试
$done({
    status: 404, 
    headers: {
        "X-Spotify-Block-By": "Stash-Error-Test",
        "Content-Type": "application/json" // 故意给个错的类型
    },
    body: "{}"
});

console.log(`[✅ Spotify Test] 已返回 404 错误，测试是否折叠空框`);
