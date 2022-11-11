
const urlCustomers = 'http://localhost:3001/api/v1/customers'
const urlRooms = 'http://localhost:3001/api/v1/rooms'
const urlBookings = 'http://localhost:3001/api/v1/bookings'

function getData(url) {
  return fetch(url)
    // .then(response => response.json())
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    })
    .catch(err => {
      // unhide element here showing error message 
      console.log(err)});
}

const getAllData = () => {
  return Promise.all([
    getData(urlBookings),
    getData(urlRooms),
    getData(urlCustomers),
  ])
}

function postData(body, url) {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    })
    .catch(err => console.log(err))
    // unhide element here showing error message 
  })

}

export { getData, postData, getAllData } 