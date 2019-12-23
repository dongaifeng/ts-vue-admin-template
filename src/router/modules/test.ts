import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const test: RouteConfig = {

  path: '/test',
  component: Layout,
  redirect: '/test/page1',
  name: 'Test',
  meta: {
    title: '测试页面',
    icon: 'example',
    roles: ['admin', 'editor'],
    alwaysShow: true
  },
  children: [
    {
      path: 'page1',
      component: () => import(/* webpackChunkName: "page1" */ '@/views/test/page.vue'),
      name: 'dfgdfg',
      meta: { title: '页面1' }
    },
    {
      path: 'page2',
      component: () => import(/* webpackChunkName: "page1" */ '@/views/test/page.vue'),
      name: 'dfgdgf',
      meta: { title: '页面2', roles: [ 'editor'] }
    },
    {
      path: 'page3',
      component: () => import(/* webpackChunkName: "page1" */ '@/views/test/page.vue'),
      name: 'vbcxvxc',
      meta: { title: '页面3',  roles: [ 'editor'], }
    },
  ]
}

export default test