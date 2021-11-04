import path from "path";
import { getIntercomInstance } from "./plugin";

declare module "vue/types/vue" {
  interface Vue {
    $intercom: typeof getIntercomInstance;
  }
}

export default function IntercomModule(this: any): void {
  const defaults = {
    disabled: false,
    hideDefaultLauncher: false,
    alignment: "right",
    horizontalPadding: 20,
    verticalPadding: 20,
    enableMobilePadding: false,
    i18n: false,
  };

  const options = Object.assign({}, defaults, this.options.intercom);
  if (typeof options.appId !== "string" || !options.appId.length) {
    throw new Error("nuxt-intercom: appId is required");
  }

  this.addPlugin({
    src: path.resolve(__dirname, "plugin.js"),
    ssr: false,
    options,
  });
}
