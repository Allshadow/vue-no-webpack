<template>
  <div class="nav-head">
    <slot :data="{key: 123}" prop="afa" name="nav"></slot>
    <slot :data="{key: 123}" prop="默认"></slot>
  </div>
</template>

<script>
import Slot from '../../views/slot.vue';
export default {
  components: {Slot},
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