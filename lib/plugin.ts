import { Plugin } from "@nuxt/types";
import Intercom from "./Intercom";
import { IntercomSettings } from "./type";

let intercom: Intercom | null;
let settings: IntercomSettings;
let installed = false;

const intercomPlugin: Plugin = (ctx, inject): void => {
  intercom = intercom === null ? new Intercom(settings) : intercom;
  inject("intercom", intercom);

  ctx.app.mixins.push(intercomMixin);
};

const intercomMixin = {
  mounted() {
    if (installed) return;

    if (typeof window.Intercom === "function") {
      this.intercom.init();
      this.intercom.execute("reattach_activator");
      this.intercom.update();
    } else {
      window.Intercom = createIntercomPlaceholder();

      callWhenPageLoaded(() =>
        includeIntercomScript(
          settings.appId,
          initialiseIntercom(settings.appId)
        )
      );
    }

    installed = true;
  },
};

/**
 * Overrides the function that pushes the actions performed to be in a queue.
 */
function createIntercomPlaceholder() {
  const placeholder = (...args) => placeholder.c(args);
  placeholder.queue = [];
  placeholder.c = (args) => placeholder.queue.push(args);

  return placeholder;
}

/**
 * Sets a callback when the browser loads.
 * Supports IE8 and IE9+
 *
 * @param callback
 */
function callWhenPageLoaded(callback) {
  if (window.attachEvent) {
    window.attachEvent("onload", callback);
  } else {
    window.addEventListener("load", callback, false);
  }
}

/**
 * Initialise Intercom and auto booting if set to do so.
 *
 * @param appId
 */
function initialiseIntercom(appId) {
  this.intercom.init();

  if (settings.autoBoot) {
    this.intercom.boot({ app_id: appId });
  }
}

/**
 * Include Intercom script in the main js file.
 *
 * @param appId
 * @param callback
 */
function includeIntercomScript(appId, callback) {
  const intercomScript = document.createElement("script");
  intercomScript.async = true;
  intercomScript.src = `https://widget.intercom.io/widget/${appId}`;
  const firstScript = document.getElementsByTagName("script")[0];
  firstScript.parentNode.insertBefore(intercomScript, firstScript);
  intercomScript.addEventListener("load", callback);
}

export default intercomPlugin;
