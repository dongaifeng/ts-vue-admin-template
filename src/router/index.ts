import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'

/* Router modules */
import test from './modules/test'


Vue.use(Router)

/*
  Note: sub-menu only appear when children.length>=1
  Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
*/

/*
  name:'router-name'             关系到tag的出现， the name field is required when using <keep-alive>, it should also match its component's name property
                                 detail see : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    roles: ['admin', 'editor']   角色 控制 这个路由那个角色可访问
    title: 'title'               路由名称 关系到 侧边栏，tag
    icon: 'svg-name'             侧边栏里的icon
    hidden: true                 是否出现在侧边栏菜单
    alwaysShow: true             if true, will always show the root menu (default is false)
                                 if false, hide the root menu when has less or equal than one children route
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    noCache: true                if true, the page will not be cached (default is false)
    affix: true                  控制tag-view 显隐
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
*/

/**
  基本路由  所有角色都可访问
*/
export const constantRoutes: RouteConfig[] = [
  // 重定向
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path*',
        component: () => import(/* webpackChunkName: "redirect" */ '@/views/404.vue')
      }
    ]
  },
// 登录
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { hidden: true }
  },
  //  404
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
    meta: { hidden: true }
  },
 // 根路径 重定向到首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: '首页',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  },
 
  // 业务页面
  {
    path: '/example',
    component: Layout,
    redirect: '/example/tree',
    meta: {
      title: '系统管理',
      icon: 'example',
      affix: true 
    },
    children: [
      {
        path: 'tree',
        name: 'Tree',
        component: () => import(/* webpackChunkName: "tree" */ '@/views/tree/index.vue'),
        meta: {
          title: 'Tree',
          icon: 'tree',
        }
      },
      {
        path: 'table',
        name: 'Table',
        component: () => import(/* webpackChunkName: "table" */ '@/views/table/index.vue'),
        meta: {
          title: 'Table',
          icon: 'table',
        }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'form',
        component: () => import(/* webpackChunkName: "form" */ '@/views/form/index.vue'),
        meta: {
          title: '上报管理',
          icon: 'form',
          
        }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    meta: {
      title: '菜单',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        
        component: () => import(/* webpackChunkName: "menu1" */ '@/views/nested/menu1/index.vue'),
        redirect: '/nested/menu1/menu1-1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            name: 'menu1-1',
            component: () => import(/* webpackChunkName: "menu1-1" */ '@/views/nested/menu1/menu1-1/index.vue'),
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
           
            component: () => import(/* webpackChunkName: "menu1-2" */ '@/views/nested/menu1/menu1-2/index.vue'),
            redirect: '/nested/menu1/menu1-2/menu1-2-1',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                name: 'menu1-2-1',
                component: () => import(/* webpackChunkName: "menu1-2-1" */ '@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
                meta: { title: 'Menu1-2-1',   }
              },
              {
                path: 'menu1-2-2',
                name: 'menu1-2-2', 
                component: () => import(/* webpackChunkName: "menu1-2-2" */ '@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
                meta: { title: 'Menu1-2-2',  }
              }
            ]
          },
          {
            path: 'menu1-3',
            name: 'menu1-3',
            component: () => import(/* webpackChunkName: "menu1-3" */ '@/views/nested/menu1/menu1-3/index.vue'),
            meta: { title: 'Menu1-3',   }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'menu2',
        component: () => import(/* webpackChunkName: "menu2" */ '@/views/nested/menu2/index.vue'),
        meta: { title: 'Menu2',   }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/Armour/vue-typescript-admin-template',
        meta: {
          title: '文档链接',
          icon: 'link'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  }
]

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 * 设置角色： 必须在第一层设置角色 然后才能在第二次设置uese
*/
export const asyncRoutes: RouteConfig[] = [

  {
    path: '/permission',
    component: Layout,
    // redirect: '/permission/page',
    meta: {
      title: '权限控制',
      icon: 'link',
      roles: ['admin', 'editor'], // you can set roles in root nav
      // alwaysShow: true // will always show the root menu
    },
    children: [
      {
        path: 'page',
        component: () => import(/* webpackChunkName: "permission-page" */ '@/views/404.vue'),
        name: 'admin用户',
        meta: {
          title: 'admin',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'editor',
        component: () => import(/* webpackChunkName: "permission-page" */ '@/views/404.vue'),
        name: 'editor用户',
        meta: {
          title: 'editor',
          roles: ['editor'] // or you can only set roles in sub nav
        }
      }
    ]
  },


 test
 
]

const createRouter = () => new Router({
  // mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
