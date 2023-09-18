<template>
  <div class="container">
    <DateTimeSlider type="time" />
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
  box-sizing: border-box;
}
</style>
