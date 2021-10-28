import Config from "@/config";
import { DefaultTheme } from "@/style/theme/default";
export default {
    'webview': {
        name: 'webview',
        title: Config.appChineseName,
        navigationBar: {
            height: 46,
            shadow: 'rgba(255, 255, 255, 0)',
            color: DefaultTheme.gray[7],
            fontSize: 16
        },
        progress: {
            type: 'page',
            color: DefaultTheme.primaryColor,
            height: 2
        }
    }
};
