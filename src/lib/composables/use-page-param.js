import { reactive } from "vue";

export const usePageParam = (defaultPageParam) => {
    let pageParam = reactive(defaultPageParam || {});
    for (let [key, value] of Object.entries(api.pageParam)) {
        pageParam[key] = value;
    }
    return pageParam;
};
