/**
 * 发起请求
 * 底层：api.ajax
 * @param url {String} 请求地址
 * @param options {Object} 请求配置项，具体见 api.ajax 的配置
 * @param isValues {Boolean} options.data 的 POST 数据是否以 values 表单方式提交，默认为 true
 * @return {Promise} 请求成功 resolve，请求失败 reject
 * 备注：
 *  【特性】底层 api.ajax 的 POST 数据支持多种提交方式，如果在 options.data 指定了提交方式，isValues 参数需设为 false
 */
export function request(url, options, isValues = true) {
    // 默认配置项
    options = Object.assign({
        url,
        method: 'POST',
        timeout: 10,
    }, options);

    // data 参数的提交方式
    if (options.method.toUpperCase() !== 'GET') {
        if (options.data && isValues) {
            options.data = { values: options.data };
        }
    }

    // 发起请求
    return new Promise((resolve, reject) => {
        api.ajax(options, (res, err) => {
            if (res) {
                resolve(res);
            } else {
                // 统一错误信息的字段名为 message
                err.message = err.msg;
                reject(err);
            }
        });
    });
}
