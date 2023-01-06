<script>
const routes = [
  { path: '*', redirect: '/user/login-v3' },
  { path: '/home', name: 'home', component: () => import('../pages/Home.vue') },
  { path: '/patient', name: 'patient', component: () => import('../pages/patient/Dashboard.vue') },
  { path: '/patient/:id', name: 'patient_detail', component: () => import('../pages/patient/PatientDetail.vue') },
  { path: '/approve', name: 'approve', component: () => import('../pages/approve/Dashboard.vue') },
  { path: '/refer-receive', name: 'refer_receive', component: () => import('../pages/refer/ReferReceiveTable.vue') },
  { path: '/refer-send', name: 'refer_send', component: () => import('../pages/refer/ReferSendTable.vue') },
  { path: '/user/login-v3', component: () => import('../pages/User-login-v3.vue') },
]

export default routes
</script>
