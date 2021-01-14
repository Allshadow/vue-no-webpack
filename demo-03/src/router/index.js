import Vue from 'vue'
import VueRouter from 'vue-router'
import PdfViewer from '@/views/PdfViewer'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/pdfviewer'
  },
  {
    path: '/pdfviewer',
    name: 'pdfViewer',
    component: PdfViewer
  }
]

const router = new VueRouter({
  routes
})

export default router
