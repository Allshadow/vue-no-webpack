<template>
  <div class="pdf-viewer">
    <el-button @click="toShow">预览pdf</el-button>
    <base-pdf-viewer 
      :url-list="urlList" 
      v-if="isShow"
      :on-close="closeViewer"
    >
    </base-pdf-viewer>
  </div>
</template>

<script>

export default {
  name: 'PdfViewer',
  components: {
    BasePdfViewer: ()=> import('@/components/BasePdfViewer')
  },
  data(){
    return{
      isShow: false,
      urlList: [
        'http://image.cache.timepack.cn/nodejs.pdf',
        'http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'
      ]
    }
  },
  methods:{
    toShow(){
      this.isShow = true
    },
    closeViewer(){
      // this.$emit('update:visible', false)
      this.isShow = false
    }
  }
}
</script>
