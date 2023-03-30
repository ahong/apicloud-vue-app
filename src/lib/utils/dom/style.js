import { isNumeric } from "@/lib/utils/validate/data-type/is-number";

// 添加 CSS 样式值单位：数字型的值默认添加 px 单位
export function addUnit(value) {
    return isNumeric(value) ? (value + 'px') : value;
}
