export const isAuthenticated = () => {
  const token = document.cookie.split('; ')
    .find(i => i.startsWith('auth-token'))
    .split('=')[1];
  return token === '123'
}
