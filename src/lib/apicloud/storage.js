import { isObject } from "@/lib/utils/validate";

/**
 * 设置偏好数据
 * 底层：api.setPrefs
 * @param key {String|Object} 偏好数据的键，支持使用 Object 设置多个偏好数据
 * @param value {String} 偏好数据的值，当 key 为 String 时有效
 */
export function setPrefs(key, value) {
    if (isObject(key)) {
        for (let [k, v] of Object.entries(key)) {
            api.setPrefs({ key: k, value: v });
        }
    } else {
        api.setPrefs({ key, value });
    }
}

/**
 * 获取偏好数据
 * 底层：api.getPrefs
 * @param key {String} 偏好数据的键
 * @param sync {Boolean} 是否同步获取，默认值为 true
 * @return {*|Promise} 同步获取时，直接返回偏好数据的值；异步获取时，返回 Promise，从 resolve 中获取偏好数据的值
 */
export function getPrefs(key, sync = true) {
    if (sync) {
        return api.getPrefs({ key, sync: true });
    } else {
        return new Promise((resolve) => {
            api.getPrefs({ key }, (res) => {
                resolve(res.value);
            });
        });
    }
}

/**
 * 删除偏好数据
 * 底层：api.removePrefs
 * @param key {String|Array} 偏好数据的键，支持使用 Array 删除多个偏好数据
 */
export function removePrefs(key) {
    if (Array.isArray(key)) {
        key.forEach((k) => api.removePrefs({ key: k }));
    } else {
        api.removePrefs({ key });
    }
}

/**
 * 备注：
 *  【底层】偏好数据不存在时（从未 set，或被 remove），返回空字符串
 *  【底层】关于设置、获取的数据类型
 *      api.setPrefs 设置的值为 NaN、null、undefined 时，api.getPrefs 获取的是空字符串
 *      api.setPrefs 设置的值为 Number、String、Boolean 时，api.getPrefs 获取的是原值
 *      api.setPrefs 设置的值为 Array、Object 时，api.getPrefs 获取的是原值的 JSON 化字符串，可使用 JSON.parse 解析
 *  【底层】数据存储在本地文件系统，清除App数据 或 卸载App 时会被清除
 */
export const Prefs = {
    set: setPrefs,
    get: getPrefs,
    remove: removePrefs,
};


/**
 * 设置全局数据
 * 底层：api.setGlobalData
 * @param key {String|Object} 全局数据的键，支持使用 Object 设置多个全局数据
 * @param value {String} 全局数据的值，当 key 为 String 时有效
 */
export function setGlobalData(key, value) {
    if (isObject(key)) {
        for (let [k, v] of Object.entries(key)) {
            api.setGlobalData({ key: k, value: v });
        }
    } else {
        api.setGlobalData({ key, value });
    }
}

/**
 * 获取全局数据
 * 底层：api.getGlobalData
 * @param key {String} 全局数据的键
 * @return {*} 全局数据的值
 */
export function getGlobalData(key) {
    return api.getGlobalData({ key });
}

/**
 * 删除全局数据
 * 底层：利用 api.setGlobalData 设为空字符串
 * @param key {String|Array} 全局数据的键，支持使用 Array 删除多个全局数据
 */
export function removeGlobalData(key) {
    if (Array.isArray(key)) {
        key.forEach((k) => api.setGlobalData({ key: k, value: '' }));
    } else {
        api.setGlobalData({ key, value: '' });
    }
}

/**
 * 备注：
 *  【底层】全局数据不存在时（从未 set，或被 remove），返回空字符串
 *  【底层】关于设置、获取的数据类型
 *      api.setGlobalData 设置的值为 NaN、null、undefined 时，api.getGlobalData 获取的是空字符串
 *      api.setGlobalData 设置的值为 Number、String、Boolean、Array、Object 时，api.getGlobalData 获取的是原值
 *  【底层】数据存储在运行内存中，关闭 App 后数据会被清除
 */
export const GlobalData = {
    set: setGlobalData,
    get: getGlobalData,
    remove: removeGlobalData
};
