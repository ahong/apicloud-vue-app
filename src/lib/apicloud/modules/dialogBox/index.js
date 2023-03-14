/**
 * dialobBox：https://www.apicloud.com/mod_detail/143063
 */
import input from "./input";
import alert from "./alert";
import raffle from "./raffle";
import confirm from "./confirm";
import discount from "./discount";
import evaluation from "./evaluation";

function getModule() {
    return api.require('dialogBox');
}

export const dialogBox = {
    input() { return input.apply(getModule(), arguments) },
    alert() { return alert.apply(getModule(), arguments) },
    raffle() { return raffle.apply(getModule(), arguments) },
    confirm() { return confirm.apply(getModule(), arguments) },
    discount() { return discount.apply(getModule(), arguments) },
    evaluation() { return evaluation.apply(getModule(), arguments) },
};
