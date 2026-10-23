import API from '@/utils/api/index.js'

// Запрос на аутентификацию
async function loginAPI({ login, password }) {
  console.log('[API]: loginAPI()')

  return new Promise((resolve) => {
    API.QUERY({
      method: 'post',
      url: `/api/login`,
      data: { login, password },
    })
      .then((response) => resolve(response))
      .catch((error) => console.log(error))
  })
}

export { loginAPI }
