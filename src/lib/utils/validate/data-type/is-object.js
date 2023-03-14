/**
 * 判断值是否为 Object 引用类型
 * Tip：typeof null === 'object'
 */
export function isObject(value) {
    return value !== null && typeof value === 'object';
}

/**
 * 判断值是否为明确的 Object 键值对数据结构
 */
export function isPlainObject(value) {
    return value && Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * 判断值是否为空的 Object 键值对数据结构
 */
export function isEmptyPlainObject(value) {
    return isPlainObject(value) && JSON.stringify(value) === '{}';
}
