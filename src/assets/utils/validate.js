// 判断值是否为数字型：纯数字或字符串数字
export function isNumeric(val) {
    return /^\d+(\.\d+)?$/.test(val);
}
