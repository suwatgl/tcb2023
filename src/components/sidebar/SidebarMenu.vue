<script>
const sidebarMenu = [
  { path: '/home', icon: 'fa fa-home', title: 'หน้าหลัก' },
  { path: '/patient', icon: 'fa fa-chalkboard-user', title: 'ประวัติเวชระเบียน', auth: true },
  { path: '/approve', icon: 'fa fa-clipboard-check', title: 'ประวัติรอ Approve', auth: true },
  { path: '/refer-send', icon: 'fa fa-truck-medical', title: 'ส่ง Refer ไปยัง รพ.อื่น', auth: true },
  { path: '/refer-receive', icon: 'fa fa-truck-medical', title: 'รับ Refer จาก รพ.อื่น', auth: true },
  { path: '/staff', icon: 'fa fa-user', title: 'บุคลากร', auth: true },
  { path: '/durable', icon: 'fa fa-sitemap', title: 'ครุภัณฑ์', auth: true },
  { path: '/report', icon: 'fa fa-file-lines', title: 'Report', auth: true },
  { path: '/setting', icon: 'fa fa-cog', title: 'Setting', auth: true },
  { path: '/logout', icon: 'fa fa-square', title: 'Logout', auth: true },
]

export default sidebarMenu
</script>
