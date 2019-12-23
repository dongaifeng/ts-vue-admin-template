import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { RouteConfig } from 'vue-router'
import { asyncRoutes, constantRoutes } from '@/router'
import store from '@/store'

// export interface IRoleData {
//   key: string
//   name: string
//   description: string
//   routes: any
// }

// let routes = constantRoutes.concat(asyncRoutes)

// 角色列表
// const roles: IRoleData[] = [
//   {
//     key: 'admin',
//     name: 'admin',
//     description: 'Super Administrator. Have access to view all pages.',
//     routes: routes
//   },
//   {
//     key: 'editor',
//     name: 'editor',
//     description: 'Normal Editor. Can see all pages except permission page',
//     routes: routes.filter(i => i.path !== '/permission') // Just a mock
//   },
//   {
//     key: 'visitor',
//     name: 'visitor',
//     description: 'Just a visitor. Can only see the home page and the document page',
//     routes: [{
//       path: '',
//       redirect: 'dashboard',
//       children: [
//         {
//           path: 'dashboard',
//           name: 'Dashboard',
//           meta: { title: 'dashboard', icon: 'dashboard' }
//         }
//       ]
//     }]
//   }
// ]

const hasPermission = (roles: string[], route: RouteConfig) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

// 过滤异步路由的
export const filterAsyncRoutes = (routes: RouteConfig[], roles: string[] = ['admin', 'aaa', 'editor']) => {
  const res: RouteConfig[] = []
  routes.forEach(route => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}

export interface IPermissionState {
  routes: RouteConfig[]
  dynamicRoutes: RouteConfig[]
}
// 此模块的routes 是过滤角色后 合并的路由表 会给到侧边栏 去生成菜单
@Module({ dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements IPermissionState {
  public routes: RouteConfig[] = []
  public dynamicRoutes: RouteConfig[] = []

  @Mutation
  private SET_ROUTES(routes: RouteConfig[]) {
    this.routes = constantRoutes.concat(routes)
    this.dynamicRoutes = routes
  }

  @Action
  public GenerateRoutes(roles: string[]) {
    let accessedRoutes
    if (roles.includes('admin')) {
      accessedRoutes = asyncRoutes
    } else {
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    }
    this.SET_ROUTES(accessedRoutes)
  }
}

export const PermissionModule = getModule(Permission)
