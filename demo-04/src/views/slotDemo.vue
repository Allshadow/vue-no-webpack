<template>
  <div class="">
    <nav-head>
      <template v-slot:nav="scope">
        <div>{{scope}}</div>
      </template>
      <!-- 或者 -->

      <template v-slot:default="scope">{{scope}}</template>
    </nav-head>
  </div>
</template>

<script>
export default {
  components: {
    NavHead: () => import('@/components/NavHead')
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style scoped>
</style>