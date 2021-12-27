import { isNumeric } from "@/assets/utils/validate";

// 添加 CSS 样式值单位：数字型的值默认添加 px 单位
export function addUnit(val) {
    return isNumeric(val) ? (val + 'px') : val;
}
