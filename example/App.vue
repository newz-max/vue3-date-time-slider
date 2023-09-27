<template>
  <div class="container">
    <div class="box">
      <DateTimeSlider type="time" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { DateTimeSlider } from "../packages";
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  background-color: black;
  width: 100vw;
  height: 100vh;
  padding-top: 100px;
  padding-left: 100px;
  box-sizing: border-box;
}

.box {
  position: fixed;
  top: 200px;
  left: 300px;
}
</style>
