<script setup>

</script>

<template>
  <div class="icon-container">
    <div class="potato-border">
    <img alt="Potato logo" src="../assets/potato.png" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.icon-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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