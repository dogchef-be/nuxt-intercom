import path from "path";
import { getIntercomInstance } from "./plugin";

declare module "vue/types/vue" {
  interface Vue {
    $intercom: typeof getIntercomInstance;
  }
}

export default function IntercomModule(this: any): void {
  const options = this.options.intercom;
  if (typeof options.appId !== "string" || !options.appId.length) {
    throw new Error("nuxt-intercom: appId is required");
  }

  this.addPlugin({
    src: path.resolve(__dirname, "plugin.js"),
    ssr: false,
    options,
  });
}
