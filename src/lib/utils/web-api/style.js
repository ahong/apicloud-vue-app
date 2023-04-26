import { isNumeric } from "@/lib/utils/validate";

/**
 * 添加 CSS 样式值单位：数字型的值默认添加 px 单位
 */
export function addUnit(value) {
    return isNumeric(value) ? `${value}px` : value;
}

/**
 * 创建 BEM 类名空间
 * Tip：CSS BEM 命名规范 https://getbem.com/
 */
function genMods(name, mods) {
    if (!mods) {
        return '';
    }

    // 单个修饰名
    if (typeof mods === 'string') {
        return ` ${name}--${mods}`;
    }

    // 数组形式的多个修饰名
    if (Array.isArray(mods)) {
        return mods.reduce((acc, mod) => {
            return acc + genMods(name, mod);
        }, '');
    }

    // 对象形式的多个修饰符
    return Object.keys(mods).reduce((acc, mod) => {
        return acc + (mods[mod] ? genMods(name, mod) : '');
    }, '');
}
export function createBEM(name) {
    return (el, mods) => {
        if (el && typeof el !== 'string') {
            mods = el;
            el = '';
        }
        el = el ? `${name}__${el}` : name;
        return `${el}${genMods(el, mods)}`;
    };
}
