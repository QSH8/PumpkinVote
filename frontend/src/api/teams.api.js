import API from '@/utils/api/index.js'


// Запрос на получение команд
async function getTeamsAPI(payload) {
  console.log('[API]: getTeamsAPI()')

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
  getTeamsAPI,
}
