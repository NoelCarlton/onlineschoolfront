import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/index',
    name: '教师管理',
    meta: { title: '教师管理', icon: 'example' },
    children: [
      {
        path: 'index',
        name: '信息展示',
        component: () => import('@/views/teacher/index'),
        meta: { title: '教师信息展示', icon: 'table' }
      },
      {
        path: 'save',
        name: '信息查询',
        component: () => import('@/views/teacher/save'),
        meta: { title: '信息保存', icon: 'tree' }
      },
      {
        path: 'update/:id',
        hidden: true,
        name: '修改老师信息',
        component: () => import('@/views/teacher/save'),
        meta: { title: '修改讲师', nocache: true }
      }
    ]
  },
  {
    path: '/subject',
    component: Layout,
    redirect: '/subject/list',
    name: '课程列表',
    meta: { title: '课程列表', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '信息展示',
        component: () => import('@/views/subject/list'),
        meta: { title: '课程信息展示', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加课程',
        component: () => import('@/views/subject/save'),
        meta: { title: '添加课程', icon: 'tree' }
      }
    ]
  },
  {
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    name: '课程管理',
    meta: {
      title: '课程列表',
      icon: 'nested'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/course/list'), // Parent router-view
        name: '课程管理',
        meta: { title: '课程列表', icon: 'tree' }
      },      
      {
        path: 'info',
        name: '课程信息',
        component: () => import('@/views/course/info'),
        meta: { title: '课程信息', icon: 'table' }
      },
      {
        path: 'info/:id',
        name: '课程信息',
        hidden: true,
        component: () => import('@/views/course/info'),
        meta: { title: '课程信息', icon: 'table' }
      },
      {
        path: 'add/:id',
        hidden: true,
        name: '发布课程',
        component: () => import('@/views/course/add'),
        meta: { title: '课程发布', icon: 'table' }
      },
      {
        path: 'chapter/:id',
        hidden: true,
        name: '课程大纲信息',
        component: () => import('@/views/course/chapter'),
        meta: { title: '课程大纲', nocache: true }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
