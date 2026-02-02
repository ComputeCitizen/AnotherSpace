// 通用 Spotify 首页净化模板
// 适用于 Stash/QX
// 原理：递归遍历所有层级，尝试删除包含 "ad", "campaign", "sponsor" 等关键词的节点

const url = $request.url;
let body = $response.body;

if (body.startsWith('{')) {
    try {
        let obj = JSON.parse(body);
        
        if (url.includes('home-view') || url.includes('view/v2')) {
            removeAds(obj);
        }

        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        console.log("Spotify净化脚本错误: " + e);
        $done({});
    }
} else {
    $done({});
}


function removeAds(obj) {
    for (let key in obj) {
        if (Array.isArray(obj[key])) {
            obj[key] = obj[key].filter(item => {
                let str = JSON.stringify(item).toLowerCase();
                
                // 比如: "is_advertisement": true
                if (str.includes('"is_advertisement":true') || 
                    str.includes('commercial') || 
                    str.includes('sponsored') ) {
                    console.log("🔪 杀掉一个广告节点");
                    return false; // 删掉
                }
                
                if (typeof item === 'object') {
                    removeAds(item);
                }
                return true;
            });
        } 
        else if (typeof obj[key] === 'object') {
            removeAds(obj[key]);
        }
    }
}
