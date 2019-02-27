
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') },
      { path: 'empresa', component: () => import('pages/crud/empresa') },
      { path: 'relogio', component: () => import('pages/crud/relogio') },
      { path: 'feriado', component: () => import('pages/crud/feriado') },
      { path: 'justificativa', component: () => import('pages/crud/justificativa') },
      { path: 'horario', component: () => import('pages/crud/horario') },
      { path: 'ocorrencia', component: () => import('pages/crud/ocorrencia') },
      { path: 'departamento', component: () => import('pages/crud/departamento') },
      { path: 'funcionario', component: () => import('pages/crud/funcionario') },
      { path: 'local', component: () => import('pages/crud/local') },
      { path: 'perfil', component: () => import('pages/crud/perfil') },
      { path: 'lancarjustificativa', component: () => import('pages/crud/lancarjustificativa') },
      { path: 'enviarmensagem', component: () => import('pages/crud/enviarmensagem') },
      { path: 'trocarhorario', component: () => import('pages/crud/trocarhorario') },
      { path: 'lancarocorrencia', component: () => import('pages/crud/lancarocorrencia') },
      { path: 'jornada', component: () => import('pages/crud/jornada') },
      { path: 'aceitarjustificativa', component: () => import('pages/crud/aceitarjustificativa') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
