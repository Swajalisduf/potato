import messagesJson from '~/assets/static/spudbot-messages.json'
export default {
  /**
   * Generate a user message
   */
  createUserMessageData({text, id}) {
    return {
      id,
      type: "userMessage",
      text
    }
  },
  /**
   * Returns formatted time in HH:mm format appended with am/pm
   * @returns String
   */
  getCurrentTime() {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

    return `${formattedHours}:${formattedMinutes}${ampm}`
  },

  /**
   * Get the default messages for Spudbot greeting
   * @returns Array
   */
  getDefaultMessages() {
    return this.messages() && this.messages().filter(message => message.type === 'defaultMessage')
  },

  /**
   * Get all potato search messages
   * @returns Array
   */
  getPotatoSearchMessages() {
    return this.messages() && this.messages().filter(message => message.type === 'potatoSearch')
  },

  /**
   * Get potato search message by id
   * @param {Integer} id 
   * @returns 
   */
  getPotatoSearchById(id) {
    return this.messages() && this.getPotatoSearchMessages().filter(message => message.id === id)[0]
  },

  /**
   * Get all offended potato messages
   * @returns 
   */
  getOffendedPotatoMessages() {
    return this.messages() && this.messages().filter(message => message.type === 'offendedPotato')
  },

  /**
   * Get offended potato message by id
   * @param {Integer} id 
   * @returns 
   */
  getOffendedPotatoById(id) {
    return this.messages() && this.getOffendedPotatoMessages().filter(message => message.id === id)[0]
  },

  /**
   * Returns parsed JSON messages
   * @returns Object
   */
   messages() {
    return messagesJson
  },
}