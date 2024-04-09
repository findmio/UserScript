// ==UserScript==
// @name         移除导流公众号
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  去除网页中的“导流公众号”
// @author       mio
// @icon         https://openwrite.cn/favicon.ico
// @homepage     https://github.com/findmio/UserScript
// @homepageURL  https://github.com/findmio/UserScript
// @include      http*://*
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
    "use strict";
    let remove = false;
    let btwTimer = null;

    destroyBTWPlugin();

    function destroyBTWPlugin() {
        // 判断是否有插件
        const hasBTWPlugin = typeof BTWPlugin == "function";

        if (!hasBTWPlugin) {
            return;
        }

        if (!btwTimer) {
            btwTimer = setInterval(() => {
                destroyBTWPlugin();
            }, 1000);
        }

        if (remove) {
            clearInterval(btwTimer);
        }

        const blogId = window.btw?.options?.blogId;

        if (blogId) {
            const tokenKey = `TOKEN_${blogId}`;
            const token = localStorage.getItem(tokenKey);
            if (!token) {
                localStorage.setItem(tokenKey, blogId);
                window.location.reload();
            }
            remove = true;
        }
    }
})();
