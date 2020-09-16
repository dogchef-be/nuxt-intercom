import { Plugin } from "@nuxt/types";
import Intercom from "./Intercom";

let intercom: Intercom | null;

const intercomPlugin: Plugin = (ctx, inject): void => {
  intercom = intercom === null ? new Intercom() : intercom;
  inject("intercom", intercom);
};

export default intercomPlugin;
