<template>
  <div class="container">
    <Breadcrumb :items="['menu.record', 'menu.record.password']" />
    <div class="layout">
      <div class="layout-left-side">
        <Main />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Main from "./components/main.vue";
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}

.layout {
  display: flex;

  &-left-side {
    flex-basis: 100%;
  }

  &-content {
    flex: 1;
    padding: 0 16px;
  }

  &-right-side {
    flex-basis: 280px;
  }
}
@media screen and (max-width: @screen-lg) {
  .layout {
    flex-wrap: wrap;
    &-left-side {
      flex: 1;
      flex-basis: 100%;
      margin-bottom: 16px;
    }

    &-content {
      flex: none;
      flex-basis: 100%;
      padding: 0;
      order: -1;
      margin-bottom: 16px;
    }

    &-right-side {
      flex-basis: 100%;
    }
  }
}
</style>