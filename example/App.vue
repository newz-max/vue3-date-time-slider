<script setup lang="ts">
import { ScaleBarGroup, ScaleBar } from "../packages";
</script>

<template>
  <div class="container">
    <ScaleBarGroup>
      <ScaleBar type="default" />
    </ScaleBarGroup>
  </div>
</template>

<style lang="scss" scoped>
.container {
  background-color: black;
  width: 100vw;
  height: 100vh;
}
</style>
