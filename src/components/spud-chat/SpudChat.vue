<script>
import SpudbotService from '~/services/spudbot-service.js'
import SpudMessage from '~/components/spud-chat/SpudMessage.vue'
import ThirdPartyAi from '~/services/third-party-ai-service.js'

export default {
  components: {
    SpudMessage
  },
  data() {
    return {
      chatOpen: false,
      chatStartTime: null,
      messages: [],
      lastSpudbotMessageId: null,
      userMessageCount: 0,
      userName: null,
      changingName: false,
      searchingHistory: false,
    }
  },
  methods: {
    onClick() {
      this.chatOpen = !this.chatOpen;
      if (this.chatOpen === true) {
        this.setChatStartTime()
        this.setDefaultGreeting() 
      } else {
        this.clearMessages()
      }
    },

    async onUserMessageKeydown(event) {
      if (event.keyCode === 13) {
        event.preventDefault()
        const userMessage = event.target.value

        if (!this.searchingHistory) {
          this.addMessage({
            data: SpudbotService.createUserMessageData({
              text: userMessage,
              id: this.userMessageCount
            }),
            from: 'user'
          })
        }

        if (!this.changingName && !this.searchingHistory && userMessage.toLowerCase().includes('change name')) {
          this.addMessage({
            data: {
              text: 'What would you like your new name to be?',
              id: `spudbot-response-${this.userMessageCount}`
            }
          })
          this.changingName = true
        } else if (this.changingName) {
          this.setUsername(userMessage)
          this.updateUserMessageName()
          this.addMessage({
            data: {
              text: `Alright I've changed your name to: ${userMessage}`,
              id: `spudbot-response-${this.userMessageCount}`
            }
          })
          this.changingName = false
        } if (!this.changingName && !this.searchingHistory && userMessage.toLowerCase().includes('search history')) {
          this.addMessage({
            data: {
              text: 'Sure. What would you like to look for?',
              id: `spudbot-response-${this.userMessageCount}`
            }
          })
          this.searchingHistory = true
        } else if (this.searchingHistory) {
          this.updateUserMessageName()
          this.addMessage({
            data: {
              text: `Here's what I found:`,
              id: `spudbot-response-${this.userMessageCount}`
            }
          })
          this.searchChatHistory(userMessage)
          this.searchingHistory = false
        } else {
          const thirdPartyResponseData = await ThirdPartyAi.getMessageFromThirdPartyAi({ author: 'user', message: userMessage })

          this.addMessage({
            ...thirdPartyResponseData
          })
        }
        event.target.value = ''
        this.userMessageCount = this.userMessageCount + 1
      }
    },

    selectOption(event, message) {
      // Remove option buttons from chat
      event.target.parentElement.remove()

      // Add user message to the chat
      const selectedOption = parseInt(event.target.value)
      const newMessageId = parseInt(message.data.id) + 1

      this.addMessage({
        data: SpudbotService.createUserMessageData({
          text: message.data.options[selectedOption],
          id: this.userMessageCount
        }),
        from: 'user'
      })

      // Determine response from bot and add response to chat
      switch (message.data.type) {
        case 'defaultMessage':
          if (selectedOption === 0) {
            this.addMessage({
              data: SpudbotService.getPotatoSearchMessages()[0]
            })
          } else {
            this.addMessage({
              data: SpudbotService.getOffendedPotatoMessages()[0]
            })
          }
          break
        case 'potatoSearch':
          if (selectedOption === 0) {
            this.addMessage({
              data: SpudbotService.getPotatoSearchById(newMessageId)
            })
          } else {
            this.addMessage({
              data: SpudbotService.getOffendedPotatoMessages()[0]
            })
          }
          break
        case 'offendedPotato':
          if (selectedOption === 0) {
            this.addMessage({
              data: SpudbotService.getPotatoSearchMessages()[0]
            })
          } else {
            this.addMessage({
              data: SpudbotService.getOffendedPotatoById(newMessageId)
            })
          }
          break
      }
    },
    
    setDefaultGreeting() {
      const defaultMessages = SpudbotService.getDefaultMessages()
      this.currentMessageId = 2
      for (const messageData of defaultMessages) {
        this.addMessage({
          data: messageData
        })
      }
    },

    setChatStartTime() {
      this.chatStartTime = SpudbotService.getCurrentTime()
    },

    setUsername(payload) {
      this.userName = payload
    },

    searchChatHistory(searchValue) {
      const matchingMessages = this.messages.filter(message => {
        return message.data.text.includes(searchValue)
      })

      for (const message of matchingMessages) {
        this.addMessage(message)
      }
    },

    updateUserMessageName() {
      if (this.userName) {
        this.messages = this.messages.map(message => {
          if (message.from === 'spudbot') {
            return message
          }
          return {
            ...message,
            from: this.userName
          }
        })
      }
    },

    addMessage({ data, from = 'spudbot' }) {
      const time = SpudbotService.getCurrentTime()
      this.messages.push({
        data,
        time,
        from,
      })
      if (from === 'spudbot') {
        this.lastSpudbotMessageId = data.id
      }
    },

    clearMessages() {
      this.messages = []
    }
  }
}
</script>

<template>
  <div >
    <div v-if="chatOpen" class="chat-container">
      <button @click="onClick()" class="btn chat-button close-chat">
        <span class=fa-icon-container>
          <i class="fas fa-times"></i>
        </span>
      </button>
      <div class="
        d-flex
        flex-column
        justify-content-center
        align-items-center
        px-2
        pt-5
        pb-3
        chat-conversation
      ">
        <div ref="messages" class="messages flex-grow-1 overflow-auto">
          <small class="mb-3 text-center">Chat started at {{ chatStartTime }}</small>
          <div 
            v-for="message in messages"
            :key="message.data.id"
            class="d-flex flex-column"
          >
            <SpudMessage :message="message" />
            <SpudMessage v-if="message.data.potatoUrl" :message="message" :potatoUrl="true" />
            <div
              class="
                message-options
                d-flex
                flex-column
                align-items-center
                mt-3"
            >
              <button 
                class="btn btn-primary m-1 w-75"
                v-for="option, i in message.data.options"
                :key="`${message.data.id}-option-${i}`"
                :value="i"
                @click="selectOption($event, message)"
              >
                {{ option }}
              </button>
            </div>
          </div>
        </div>
        <textarea class="form-control user-message-input" placeholder="Type your message" @keydown="onUserMessageKeydown($event)" />
      </div>
    </div>
    <button @click="onClick()" class="btn chat-button open-chat">
      <span class="fa-icon-container">
        <i class="far fa-comment-dots fa-lg"></i>
      </span>
    </button>
  </div>
</template>

<style scoped lang="scss">
.chat-container {
  position: fixed;
  z-index: 10;
  bottom: 24px;
  right: 24px;
  width: calc(100vw - 48px);
  height: calc(100vh - 48px);
  background-color: #00f0f0;
  border-radius: 15px;
  @include media-breakpoint-up(md) {
    height: 600px;
    width: 320px;
  } 
}

.chat-conversation {
  height: 100%;
}

.chat-button {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: 25%;
  background-color: #00f0f0;
  font-size: 2em;
}

.chat-button:hover {
  background-color: #00c0c0;
}

.chat-message {
  width: 80%;
}

.bot-message {
  background-color: $gray-400;
}

.user-message {
  background-color: $blue-400;
}

.user-message-input {
  height: 45px;
  line-height: 31px;
  resize: none;
}

.close-chat {
  top: 5px;
  right: 5px;
  width: 32px;
  height: 32px;
}

.open-chat {
  bottom: 28px;
  right: 28px;
  width: 60px;
  height: 60px;
  border: 2px solid #fff;
}

textarea::placeholder {
  line-height: 31px;
}

</style>
