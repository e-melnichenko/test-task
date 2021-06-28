const BASE_URL = 'https://nominatim.openstreetmap.org'

export const getGeoItems = (query) => {
  return fetch(`${BASE_URL}/search?q=${query}&format=json`)
    .then(handleErrors)
    .then(res => res.json())
    .catch(error => console.log(error))
}

export const loginUser = (login, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if(login === 'test' && password === 'test') {
        resolve({key: '123', ok: true})
      } else {
        resolve({ok: false, statusText: 'Неверный логин или пароль'})
      }
    }, 0)
  });
}

function handleErrors(res) {
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res
}

