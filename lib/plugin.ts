import { Plugin } from "@nuxt/types";

const INTERCOM_URL = "https://widget.intercom.io/widget/";

const INTERCOM_SETTINGS: Intercom_.IntercomSettings = {
  app_id: "<%= options.appId %>",
  hide_default_launcher:
    ("<%= options.hideDefaultLauncher %>" as string) === "true",
  alignment: "<%= options.alignment %>",
  horizontal_padding: Number.parseInt("<%= options.horizontalPadding %>"),
  vertical_padding: Number.parseInt("<%= options.verticalPadding %>"),
};

const injectScript = (appId: string): HTMLScriptElement => {
  const script = document.createElement("script");
  script.async = true;
  script.src = `${INTERCOM_URL}${appId}`;

  const headOrBody = document.head || document.body;
  headOrBody.appendChild(script);

  return script;
};

const loadScript = (
  settings: Intercom_.IntercomSettings
): Promise<typeof Intercom> => {
  return new Promise<typeof Intercom>((resolve, reject) => {
    if (typeof window.intercomSettings === "undefined") {
      window.intercomSettings = settings;
    }

    try {
      const i: any = function(...args: unknown[]): void {
        i.c(args);
      };
      i.q = [];
      i.c = function(args: unknown): void {
        i.q.push(args);
      };

      window.Intercom = i;

      let script = injectScript(settings.app_id as string);

      script.addEventListener("load", () => {
        window.Intercom("boot", settings);
        resolve(window.Intercom);
      });

      script.addEventListener("error", () => {
        reject(new Error("Failed to load Intercom"));
      });
    } catch (error) {
      reject(error);
      return;
    }
  });
};

export async function getIntercomInstance(
  command?: Intercom_.IntercomCommand,
  ...args: any
): Promise<typeof Intercom | void> {
  let instance = window.Intercom;

  if (!instance) {
    instance = await loadScript(INTERCOM_SETTINGS);
  }

  return command ? instance(command, args) : instance;
}

const intercomPlugin: Plugin = (ctx, inject): void => {
  inject("intercom", getIntercomInstance);
};

export default intercomPlugin;
