import API from '@/utils/api/index.js'


// Запрос на получение категорий
async function getCategoriesAPI(payload) {
  console.log('[API]: getCategoriesAPI()')

  return new Promise((resolve) => {
    API.QUERY({
      method: 'post',
      url: `/api/votes/submit`,
      data: payload,
    })
      .then((response) => resolve(response))
      .catch((error) => console.log(error))
  })
}


export {
  getCategoriesAPI,
}
