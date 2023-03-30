/**
 * 判断值是否为数字型，包括字符串数字如 '3.14'
 * Tip：NaN 也会返回 true，如果不要 NaN 需将 typeof 去掉
 */
export function isNumeric(value) {
    return typeof value === 'number' || /^\d+(.\d+)?$/.test(value);
}
