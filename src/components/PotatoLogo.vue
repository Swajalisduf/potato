<script>
export default {
  props: {
    size: String,
  },
}
</script>

<template>
  <div class="logo-container" :class="{'logo-lg': size === 'lg', 'logo-sm': size === 'sm'}">
    <div class="icon-container">
      <div class="potato-border">
        <img alt="Potato logo" src="../assets/images/baked-logo.png" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.logo-lg {
  width: 150px;
  height: 150px;
}

.logo-sm {
  width: 50px;
  height: 50px;
}

.icon-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.potato-border {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  img {
    width: 70%;
    height: 70%;
  }
}
</style>