import API from '@/utils/api/index.js'


async function loginAPI({ login, password }) {
  console.log('API: fetchOrdersListAPI')

  return new Promise((resolve, reject) => {
    API.QUERY({
      method: 'post',
      url: `/api/login`,
      data: { login, password },
    })
      .then((response) => resolve(response))
      .catch((error) => console.log(error))
  })
}

async function fetchOrderByIdAPI(orderId) {
  // '/order' by id
  console.log('API: fetchOrderByIdAPI, orderId ->', orderId)

  return new Promise((resolve, reject) => {
    API.QUERY({
      method: 'post',
      url: `/api/orders/get-order`,
      data: { id: orderId }
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
  return ({
    data: {
      info: {
        id: Number(orderId),
        status: 'in_progress',
        isFinished: false,
        createdAt: '2026-07-22T14:30:00',
        finishedAt: null,
        customerName: 'Александр Волков',
        acceptedBy: 'Мария (Администратор)',
        finishedBy: null,
        priority: true,
      },
      items:  [
        { id: 1, name: 'Стейк Рибай', quantity: 1, price: 1200 },
        { id: 2, name: 'Салат Цезарь', quantity: 2, price: 450 },
        { id: 3, name: 'Вино сухое', quantity: 1, price: 2100 },
      ]
    }
  })
}

async function fetchOrdersListAPI() {
  console.log('API: fetchOrdersListAPI')

  return new Promise((resolve, reject) => {
    API.QUERY({
      method: 'get',
      url: `/api/orders/list`,
    })
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

async function fetchMenuListAPI() {
  console.log('API: fetchMenuListAPI')

  return new Promise((resolve, reject) => {
    API.QUERY({
      method: 'get',
      url: `/api/menu/list`,
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
}

async function onFinishOrderAPI(orderId) {
  console.log('API: onFinishOrderAPI, orderId ->', orderId)
  return new Promise((resolve, reject) => {
    API.QUERY({
      method: 'post',
      url: `/api/orders/finish`,
      data: { id: orderId },
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
}

async function addNewOrderToQueueAPI(order) {
  console.log('API: addNewOrderToQueueAPI, order ->', order)

  return new Promise((resolve, reject) => {
    API.QUERY({
      method: 'post',
      url: `/api/orders/create`,
      data: order,
    })
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

// Warehouse
async function fetchWarehouseListAPI() {
  // '/warehouse/list'
  console.log('API: fetchWarehouseListAPI')

  return new Promise((resolve, reject) => {
    API.QUERY({
      method: 'get',
      url: `/api/warehouse/list`,
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
  })
}
async function createWarehouseItemAPI(newWarehouseItem) {
  // 'warehouse/create'
  return new Promise((resolve, reject) => {
    API.QUERY({
      method: 'post',
      url: `/api/warehouse/create`,
      data: newWarehouseItem,
    })
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}
async function editWarehouseItemAPI(warehouseItem) {
  // 'warehouse/update'
  return new Promise((resolve, reject) => {
    API.QUERY({
      method: 'post',
      url: `/api/warehouse/update`,
      data: warehouseItem,
    })
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

export {
  loginAPI,
  onFinishOrderAPI,
  addNewOrderToQueueAPI,
  createWarehouseItemAPI,
  editWarehouseItemAPI,
  fetchWarehouseListAPI,
  fetchOrdersListAPI,
  fetchOrderByIdAPI,
  fetchMenuListAPI,
}
