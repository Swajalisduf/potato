<script setup>
import PotatoLogo from '~/components/PotatoLogo.vue'
import SpudChat from '~/components/spud-chat/SpudChat.vue'
</script>

<template>
  <div class="page-container d-flex flex-column">
    <header>
      <div class="logo">
        <PotatoLogo size="lg" />
      </div>
      <div class="site-title">
        <h1>Baked!</h1>
        <h5>We probably sell potatoes</h5>
      </div>
    </header>
    <SpudChat />
  </div>
</template>

<style scoped lang="scss">
.page-container {
  height: 100vh;
  width: 100vw;
  padding: 30px;
}

header {
  flex-basis: 320px;
  flex-grow: 0;
  flex-shrink: 0;
  h1, h5 {
    text-align: center;
  }
}

body {
  img {
    height: 100%;
  }
}

footer {
  height: 15vh;
}

.logo {
  width: 100%;
  padding: 18px;
  display: flex;
  justify-content: center;
}
</style>
