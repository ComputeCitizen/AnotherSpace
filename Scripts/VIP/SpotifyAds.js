// 这里的 "" 代表空的 Protobuf 消息，对于列表类型的响应，这会被解析为“空列表”
$done({ 
    status: 200, 
    headers: $response.headers, 
    body: "" 
});
