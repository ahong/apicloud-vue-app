/**
 * 验证 prop 是否有值
 * Tip：null 和 undefined 会通过 prop 的任何类型验证
 */
export function isDef(val) {
    return val !== undefined && val !== null;
}
