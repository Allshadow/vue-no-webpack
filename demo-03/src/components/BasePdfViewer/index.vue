<template>
  <div class="base-pdf-viewer">
		<div>
			<span
				class="el-image-viewer__btn el-image-viewer__close"
				style="position: fixed"
				@click="onClose"
			>
				<i class="el-icon-circle-close"></i>
			</span>
			<span
				class="el-image-viewer__btn el-image-viewer__prev"
				:class="{ 'is-disabled': !infinite && isFirst }"
				@click="prev"
				style="position: fixed"
        v-if="!isSingle"
			>
				<i class="el-icon-arrow-left" />
			</span>
			<span
				class="el-image-viewer__btn el-image-viewer__next"
				:class="{ 'is-disabled': !infinite && isLast }"
				@click="next"
				style="position: fixed"
        v-if="!isSingle"
			>
				<i class="el-icon-arrow-right" />
			</span>
		</div>
		<pdf
			v-for="item in numPages"
			:key="item"
			:src="src"
			:page="item"
			class="pdf-wrap"
		/>
	</div>
</template>

<script>
import pdf from 'vue-pdf';

export default {
  name: 'BasePdfViewer',
  props: {
		urlList: {
			type: Array,
			default: () => [],
		},
		onClose: {
			type: Function,
			default: () => {},
		},
	},
	components: {
		pdf,
	},

	data() {
		return {
			numPages: '',
			src: '', // pdf文件地址
      infinite: true,
      index: 0
		};
	},
	computed: {
		isSingle() {
			return this.urlList.length <= 1;
		},
		isFirst() {
			return this.index === 0;
		},
		isLast() {
			return this.index === this.urlList.length - 1;
		},
	},
	watch: {
    urlList: {
      handler(newValue){
        this.dealPdf(this.urlList[0])
      },
      immediate: true
    }
  },
	methods: {
		next() {
			if (this.isLast && !this.infinite) return;
			const len = this.urlList.length;
      this.index = (this.index + 1) % len;
      this.dealPdf(this.urlList[this.index])
		},

		prev() {
			if (this.isFirst && !this.infinite) return;
      const len = this.urlList.length;
      this.index = (this.index - 1 + len) % len;
      this.dealPdf(this.urlList[this.index])
		},

		dealPdf(url) {
			this.src = pdf.createLoadingTask(
				url
      );
      this.numPages = ''
			this.src.promise.then((pdf) => {
				this.numPages = pdf.numPages;
			});
		},
	},
  created() {},
  mounted() {},
  
};
</script>
<style scoped lang="scss">
.base-pdf-viewer {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: #fff;
	z-index: 10000;
	overflow: auto;
	background: rgba($color: #000000, $alpha: 0.5);
	padding-top: 30px;
	padding-bottom: 30px;
	.pdf-wrap {
		width: 740px;
		margin: 0 auto;
	}
}
</style>