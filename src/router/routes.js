const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/login', component: () => import('pages/loginPage.vue') },
      { path: '/criaConta', component: () => import('pages/criaContaPage.vue') },
      { path: '/perfilCliente', component: () => import('pages/perfilCliente.vue'), meta: { requiresAuth: true } },
      { path: '/perfilPrestador', component: () => import('pages/perfilPrestador.vue'), meta: { requiresAuth: true } }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
