export const PageParamMixin =  {
    created() {
        for (const [key, value] of Object.entries(api.pageParam)) {
            this.pageParam[key] = value;
        }
    }
};
