import Project from 'pages/Project.vue';
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        //home leads to inbox, which is a project
        path: '',  
        component: Project, 
        alias: '/inbox' 
      },
      {
        path: '/inbox',  
        component: Project, 
      },
      {
        path: '/projects/:id', 
        component: Project, 
        props: true 
      },
      { path: '/today', 
        component: () => import('pages/Today.vue') 
      },
      { path: '/week', 
        component: () => import('pages/Week.vue') 
      },
      { path: '/about', 
        component: () => import('pages/About.vue') 
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
