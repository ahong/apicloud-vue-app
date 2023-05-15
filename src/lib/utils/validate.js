/**
 * 判断值是否为数字型，包括字符串数字如 '3.14'
 */
function isNumeric(value) {
    return /^-?\d+(.\d+)?$/.test(value);
}

/**
 * 判断值是否为 Object 引用类型
 */
function isObject(value) {
    return value !== null && typeof value === 'object';
}

/**
 * 判断值是否有定义
 * Tip：常用于 vue prop 验证，undefined 和 null 都会通过 vue prop 的类型验证
 */
function isDef(value) {
    return value !== void 0 && value !== null;
}

export {
    isNumeric,
    isObject,
    isDef
};
