<template>
  <a-card :bordered="false"
          :body-style="{ padding: '20px' }">
    <a-form ref="formRef"
            :model="formData"
            class="form"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }">
      <a-form-item field="activityName"
                   :label="$t('stepForm.form.label.activityName')"
                   :rules="[
        {
          required: true,
          message: $t('stepForm.form.error.activityName.required'),
        },
        {
          match: /^[a-zA-Z0-9\u4e00-\u9fa5]{1,20}$/,
          message: $t('stepForm.form.error.activityName.pattern'),
        },
      ]">
        <a-input-search v-model="formData.activityName" />
      </a-form-item>
    </a-form>

  </a-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { BaseInfoModel } from "@/api/form";

const formData = ref<BaseInfoModel>({
  activityName: "",
  channelType: "",
  promotionTime: [],
  promoteLink: "https://arco.design",
});
</script>

<style scoped lang="less">
</style>
