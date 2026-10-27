import API from '@/utils/api/index.js'


// Запрос на получение команд
async function getTeamsAPI(payload) {
  console.log('[API]: getTeamsAPI()')

  return new Promise((resolve) => {
    API.QUERY({
      method: 'get',
      url: `/api/votes/teams`,
      data: payload,
    })
      .then((response) => resolve(response))
      .catch((error) => console.log(error))
  })
}
// Запрос на получение команд сразу по категориям
async function getTeamsByCategoryAPI(payload) {
  console.log('[API]: getTeamsAPI()')

  return new Promise((resolve) => {
    API.QUERY({
      method: 'get',
      url: `/api/votes/teams-by-category`,
      data: payload,
    })
      .then((response) => resolve(response))
      .catch((error) => console.log(error))
  })
}


export {
  getTeamsAPI,
  getTeamsByCategoryAPI,
}
