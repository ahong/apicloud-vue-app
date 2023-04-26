import { isPlainObject } from "@/lib/utils/validate/is-object";

/**
 * 检测应用是否已取得某个或多个权限
 * 底层：api.hasPermission
 * @param list {String|Array<String>} 权限名 或 权限名列表
 * @return {Boolean} 是否已取得权限
 * 备注：
 *  【底层】对于 iOS 系统，api.hasPermission 还会返回更多信息（如 undetermined 是否从未请求或从未做出过选择），需要时可自行调用底层接口实现
 */
export function hasPermission(list) {
    if (!Array.isArray(list)) {
        list = [list];
    }
    return api.hasPermission({ list }).every((item) => item.granted);
}

/**
 * 请求某个或多个权限
 * @param list {String|Array<String>|Object}
 *  String：权限名
 *  Array<String>：权限名列表
 *  Object：配置项
 *      list：权限名列表
 *      code：【仅Android支持】请求跟踪码
 *      purposeKey：请求 locationFullAccuracy 权限的意图字段
 * @return {Promise} Promise.then：请求的权限全部取得；Promise.reject：请求的权限中有一个或多个未取得
 *  回调参数 res 的字段：
 *      list：权限列表的请求情况
 *      code：【仅Android支持】请求跟踪码
 *      never：【仅Android支持】是否选择了“不再提示”
 * 备注：
 *  【底层】需要在 APICloud 云编译中选择平台对应的隐私权限，如果在没有选择的情况下调用 api.requestPermission，iOS 会闪退，Android 在授权页没有对应的权限项让用户操作
 */
export function requestPermission(list) {
    let options;
    if (isPlainObject(list)) {
        options = list;
    } else if (Array.isArray(list)) {
        options = { list };
    } else {
        options = { list: [list] };
    }
    return new Promise((resolve, reject) => {
        api.requestPermission(options, (res) => {
            if (res.list.every((item) => item.granted)) {
                resolve(res);
            } else {
                reject(res);
            }
        });
    });
}

export const Permission = {
    has: hasPermission,
    request: requestPermission
};
