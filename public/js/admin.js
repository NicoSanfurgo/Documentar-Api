const role = JSON.parse(sessionStorage.getItem('personalData')).role

if (role !== 'admin') {
  window.location.href = '/'
}