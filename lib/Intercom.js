export default class Intercom {

  // defaultSettings = {
  //   api_id: null,
  //   custom_launcher_selector: null,
  //   alignment: null,
  //   vertical_padding: null,
  //   horizontal_padding: null,
  //   hide_default_launcher: null,
  //   session_duration: null,
  //   action_color: null,
  //   background_color: null,
  //   name: null,
  //   email: null,
  //   user_id: null,
  // }

  intercomSettings;

  constructor(intercomSettings) {
    this.intercomSettings = intercomSettings
  }

  /**
   * Direct calls to Intercom.
   * 
   * @param  {...any} params 
   */
  execute(...params) {
    if (!window.Intercom) {
      throw new Error('nuxt-intercom: Intercom is not defined, check Intercom is being loaded')
    }

    window.Intercom(...params)
  }

  /**
   * Manually boots the Intercom instance.
   * 
   * @param {*} intercomSettings 
   */
  boot(intercomSettings) {
    this.execute('boot', intercomSettings === null ? this.defaultSettings : intercomSettings)
  }

  /**
   * Shutdowns the Intercom instance. 
   */
  shutdown() {
    this.execute('shutdown')
  }

  /**
   * Updates the intercomSettings if needed.
   * This method also triggers Intercom to look for new messages that should be displayed to the current user.
   * 
   * @param {*} intercomSettings 
   */
  update(intercomSettings) {
    this.execute('update', intercomSettings === null ? this.defaultSettings : intercomSettings)
  }

  /**
   * Hides the message panel if it's open.
   */
  hide() {
    this.execute('hide')
  }

  /**
   * Shows the Messenger Home if there are no new messages, otherwise opens the message list.
   */
  show() {
    this.execute('show')
  }

  /**
   * Shows the message list.
   */
  showMessages() {
    this.execute('showMessages')
  }

  /**
   * Opens Messenger as if a new message was created.
   */
  showNewMessage() {
    this.execute('showNewMessage');
  }

  /**
   * Registers a function to be called when the Messenger is hidden.
   * 
   * @param {*} callback 
   */
  onHide(callback) {
    this.execute('onHide', callback());
  }

  /**
   * Registers a function to be called when the Messenger is shown.
   * 
   * @param {*} callback 
   */
  onShow(callback) {
    this.execute('onShow', callback())
  }

  /**
   * Registers a function to be called when the current number of unread messages changes and immediately when invoked.
   *  
   * @param {*} callback - has unreadCount as parameter
   */
  onUnreadCountChange(callback) {
    this.execute('onUnreadCountChange', callback())
  }

  /**
   * Associates the event with the currently logged in user.
   * 
   * @param {*} eventName 
   * @param {*} metadata - optional metadata about the event
   */
  trackEvent(eventName, metadata = {}) {
    this.execute('trackEvent', eventName, metadata)
  }

  /**
   * Get visitor's ID.
   */
  getVisitorId() {
    this.execute('getVisitorId')
  }

  /**
   * Triggers a tour based on an action a user or visitor takes in your site or application.
   * @param {*} tourId 
   */
  startTour(tourId) {
    this.execute('startTour', tourId)
  }
}
