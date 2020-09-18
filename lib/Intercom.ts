import { IntercomSettings } from "./type";

export default class Intercom {
  intercomSettings: IntercomSettings = {
    appId: "xgycncuq",
    unreadCount: 0,
    userData: {},
    visible: false,
    autoBoot: false,
  };

  constructor(intercomSettings) {
    this.intercomSettings = intercomSettings;
  }

  /**
   * Initializes the Intercom instance by setting up event the listeners required to maintain the internal state with Intercom state.
   */
  init() {
    this.onHide(() => {
      this.intercomSettings.visible = false;
    });
    this.onShow(() => {
      this.intercomSettings.visible = true;
    });
    this.onUnreadCountChange((unreadCount) => {
      this.intercomSettings.unreadCount = unreadCount;
    });
  }

  /**
   * Direct calls to Intercom.
   *
   * @param  {...any} params
   */
  execute(...params) {
    if (!window.Intercom) {
      throw new Error(
        "nuxt-intercom: Intercom is not defined, check Intercom is being loaded"
      );
    }

    window.Intercom(...params);
  }

  /**
   * Manually boots the Intercom instance.
   *
   * @param {*} intercomSettings
   */
  boot(intercomSettings) {
    this.execute(
      "boot",
      intercomSettings === null ? this.intercomSettings : intercomSettings
    );
  }

  /**
   * Shutdowns the Intercom instance.
   */
  shutdown() {
    this.execute("shutdown");
  }

  /**
   * Updates the intercomSettings if needed.
   * This method also triggers Intercom to look for new messages that should be displayed to the current user.
   *
   * @param {*} intercomSettings
   */
  update(intercomSettings = this.intercomSettings) {
    this.execute(
      "update",
      intercomSettings === null ? this.intercomSettings : intercomSettings
    );
  }

  /**
   * Hides the message panel if it's open.
   */
  hide() {
    this.execute("hide");
  }

  /**
   * Shows the Messenger Home if there are no new messages, otherwise opens the message list.
   */
  show() {
    this.execute("show");
  }

  /**
   * Shows the message list.
   */
  showMessages() {
    this.execute("showMessages");
  }

  /**
   * Opens Messenger as if a new message was created.
   */
  showNewMessage() {
    this.execute("showNewMessage");
  }

  /**
   * Registers a function to be called when the Messenger is hidden.
   *
   * @param {*} callback
   */
  onHide(callback) {
    this.execute("onHide", callback());
  }

  /**
   * Registers a function to be called when the Messenger is shown.
   *
   * @param {*} callback
   */
  onShow(callback) {
    this.execute("onShow", callback());
  }

  /**
   * Registers a function to be called when the current number of unread messages changes and immediately when invoked.
   *
   * @param {*} callback - has unreadCount as parameter
   */
  onUnreadCountChange(callback) {
    this.execute("onUnreadCountChange", callback());
  }

  /**
   * Associates the event with the currently logged in user.
   *
   * @param {*} eventName
   * @param {*} metadata - optional metadata about the event
   */
  trackEvent(eventName, metadata = {}) {
    this.execute("trackEvent", eventName, metadata);
  }

  /**
   * Get visitor's ID.
   */
  getVisitorId() {
    this.execute("getVisitorId");
  }

  /**
   * Triggers a tour based on an action a user or visitor takes in your site or application.
   * @param {*} tourId
   */
  startTour(tourId) {
    this.execute("startTour", tourId);
  }
}
