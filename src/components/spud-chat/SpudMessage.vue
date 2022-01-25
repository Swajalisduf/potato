<script>
export default {
  props: {
    message: Object,
    potatoUrl: Boolean,
  },
}
</script>

<template>
  <div 
    v-if="potatoUrl"
    class="d-flex flex-column mt-3 w-100"
  >
    <img 
      class="chat-message m-0 p-2"
      :class="{
        'user-message align-self-end': message.from === 'user',
        'bot-message align-self-start': message.from === 'spudbot',
      }"
      :src="message.data.potatoUrl"
      :alt="message.data.alt"
    />
    <small>{{ message.time }}</small>
  </div>
  <div
    v-else-if="message"
    class="d-flex flex-column mt-3 w-100"
  >
    <p 
      class="chat-message m-0 p-2"
      :class="{
        'user-message align-self-end text-end': message.from === 'user',
        'bot-message align-self-start': message.from === 'spudbot',
      }"
    >
      {{ message.data.text }}
    </p>
    <small :class="{'text-end': message.from === 'user'}">{{ message.time }}</small>
  </div>
</template>

<style lang="scss" scoped>
small {
  display: block;
}

.chat-message {
  width: 80%;
}

.bot-message {
  background-color: $gray-400;
}

.user-message {
  background-color: $green-300;
}

.user-message-input {
  height: 45px;
  line-height: 31px;
  resize: none;
}
</style>