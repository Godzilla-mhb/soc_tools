<template>
  <a-card :bordered="false"
          :body-style="{ padding: '20px' }">
    <a-descriptions v-for="(item, idx) in blockDataList"
                    :key="idx"
                    :label-style="{
          textAlign: 'right',
          width: '200px',
          paddingRight: '10px',
          color: 'rgb(var(--gray-8))',
        }"
                    :value-style="{ width: '400px' }"
                    :title="item.title"
                    :data="item.data">
      <template #value="{ value }">
        <a-skeleton v-if="loading"
                    :animation="true">
          <a-skeleton-line :widths="['200px']"
                           :rows="1" />
        </a-skeleton>
        <span v-else>{{ value }}</span>
      </template>
    </a-descriptions>

  </a-card>
</template>

<script lang="ts" setup>
import { computed, PropType } from "vue";
import { ProfileBasicRes } from "@/api/profile";

type BlockList = {
  title: string;
  data: {
    label: string;
    value: string;
  }[];
}[];

const props = defineProps({
  type: {
    type: String,
    default: "",
  },
  renderData: {
    type: Object as PropType<ProfileBasicRes>,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const blockDataList = computed<BlockList>(() => {
  const { renderData } = props;
  const result = [];
  result.push({
    title:
      props.type === "pre"
        ? "basicProfile.title.preVideo"
        : "basicProfile.title.video",
    data: [
      {
        label: "basicProfile.label.video.mode",
        value: renderData?.video?.mode || "-",
      },
      {
        label: "basicProfile.label.video.acquisition.resolution",
        value: renderData?.video?.acquisition.resolution || "-",
      },
      {
        label: "basicProfile.label.video.acquisition.frameRate",
        value: `${renderData?.video?.acquisition.frameRate || "-"} fps`,
      },
      {
        label: "basicProfile.label.video.encoding.resolution",
        value: renderData?.video?.encoding.resolution || "-",
      },
      {
        label: "basicProfile.label.video.encoding.rate.min",
        value: `${renderData?.video?.encoding.rate.min || "-"} bps`,
      },
      {
        label: "basicProfile.label.video.encoding.rate.max",
        value: `${renderData?.video?.encoding.rate.max || "-"} bps`,
      },
      {
        label: "basicProfile.label.video.encoding.rate.default",
        value: `${renderData?.video?.encoding.rate.default || "-"} bps`,
      },
      {
        label: "basicProfile.label.video.encoding.frameRate",
        value: `${renderData?.video?.encoding.frameRate || "-"} fpx`,
      },
      {
        label: "basicProfile.label.video.encoding.profile",
        value: renderData?.video?.encoding.profile || "-",
      },
    ],
  });

  result.push({
    title:
      props.type === "pre"
        ? "basicProfile.title.preAudio"
        : "basicProfile.title.audio",
    data: [
      {
        label: "basicProfile.label.audio.mode",
        value: renderData?.audio?.mode || "-",
      },
      {
        label: "basicProfile.label.audio.acquisition.channels",
        value: `${
          renderData?.audio?.acquisition.channels || "-"
        } ${"basicProfile.unit.audio.channels"}`,
      },
      {
        label: "basicProfile.label.audio.encoding.channels",
        value: `${
          renderData?.audio?.encoding.channels || "-"
        } ${"basicProfile.unit.audio.channels"}`,
      },
      {
        label: "basicProfile.label.audio.encoding.rate",
        value: `${renderData?.audio?.encoding.rate || "-"} kbps`,
      },
      {
        label: "basicProfile.label.audio.encoding.profile",
        value: renderData?.audio?.encoding.profile || "-",
      },
    ],
  });

  return result;
});
</script>

<style scoped lang="less">
</style>
