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

// Запрос добавление фото
async function uploadTeamPhoto(teamId, photo) {
  console.log('[API]: uploadTeamPhoto()')

  return new Promise((resolve) => {
    API.QUERY({
      method: 'post',
      url: `/api/votes/teams/${teamId}/upload`,
      data: photo,
    })
      .then((response) => resolve(response))
      .catch((error) => console.log(error))
  })
}

// Запрос добавление фото
async function getTeamPhoto(teamId) {
  console.log('[API]: getTeamPhoto()')

  return new Promise((resolve) => {
    API.QUERY({
      method: 'get',
      url: `/api/votes/photos/${teamId}`,
      responseType: 'blob'
    })
      .then((response) => resolve(response))
      .catch((error) => console.log(error))
  })
}


export {
  getTeamsAPI,
  getTeamsByCategoryAPI,
  uploadTeamPhoto,
  getTeamPhoto,
}
