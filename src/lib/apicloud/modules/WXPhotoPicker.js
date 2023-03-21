/**
 * 本地媒体资源扫描器 WXPhotoPicker：https://www.apicloud.com/mod_detail/148365
 * 旧模块 UIAlbumBrowser：https://www.apicloud.com/mod_detail/147278
 */

import { showAlert, showConfirm } from "@/lib/apicloud/ui";
import { requestPermission } from "@/lib/apicloud/permission";

export const WXPhotoPicker = {
    getModule() {
        return api.require('WXPhotoPicker');
    },

    // 请求相册访问权限
    requestPhotosPermission() {
        let hasPhotos = api.hasPermission({ list: ['photos'] })[0];
        if (hasPhotos.granted) {
            return Promise.resolve();
        }
        if (hasPhotos.undetermined) {
            // 从未请求过
            return requestPermission(['photos']);
        } else {
            // 有请求过：提示去开启
            return showConfirm({
                title: '提示',
                content: '需申请相册访问权限以便您能使用此功能',
                confirmText: '去开启'
            }).then((res) => {
                if (res.event === 'confirm') {
                    return requestPermission(['photos']);
                } else {
                    return Promise.reject();
                }
            });
        }
    },

    /**
     * 打开媒体资源选择器：优先判断是否有 photos 权限
     * @param {Object} options 模块 open 方法的配置项
     */
    pickPhoto(options) {
        return new Promise((resolve, reject) => {
            this.requestPhotosPermission().then(() => {
                this.getModule().open(Object.assign({
                    max: 9,
                    type: 'all',
                    styles: {
                        bottomTabBar: {
                            sendText: '确定',
                            sendBgColor: '#17a1ff'
                        }
                    }
                }, options), (res) => {
                    if (res.eventType === 'confirm') {
                        resolve(res.list);
                    }
                });
            }).catch(() => {
                showAlert({
                    title: '提示',
                    content: '未能获取相册访问权限，此功能无法使用'
                });
            });
        });
    }
};
