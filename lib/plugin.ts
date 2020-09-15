import { Plugin } from "@nuxt/types";
import Intercom from "./Intercom";

let intercom: Intercom | null;

const intercomPlugin: Plugin = (ctx, inject): void => {
  intercom = new Intercom();
  inject("intercom", intercom);
};

export default stripePlugin;
