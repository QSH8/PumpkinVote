import API from '@/utils/api/index.js'


// Запрос на получение результатов голосования
async function getResultsAPI() {
  console.log('[API]: getResultsAPI()')

  return new Promise((resolve) => {
    API.QUERY({
      method: 'get',
      url: `/api/votes/results`,
    })
      .then((response) => resolve(response))
      .catch((error) => console.log(error))
  })
}


// Запрос на завершение голосования
async function submitVotesAPI(payload) {
  console.log('[API]: submitVotesAPI()')

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
  getResultsAPI,
  submitVotesAPI,
}
