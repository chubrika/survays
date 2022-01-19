
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { 
        path: '', 
        component: () => import('pages/Main.vue') 
      },
      {
        path: 'surveys', 
        component: () => import('pages/Main.vue') 
      },
      {
        path:'info',
        component:()=> import('pages/info.vue')
      },
      {
        path:'add-question',
        component:()=> import('pages/Add-question.vue')
      },
      {
        path:'login',
        component:()=> import('pages/login.vue')
      },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
