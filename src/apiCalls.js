
const urlCustomers = 'http://localhost:3001/api/v1/customers'
const urlRooms = 'http://localhost:3001/api/v1/rooms'
const urlBookings = 'http://localhost:3001/api/v1/bookings'

function getData(url) {
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    })
    .catch(error => {
      console.log("GET error: ", error)
    })
}

const getAllData = () => {
  return Promise.all([
    getData(urlBookings),
    getData(urlRooms),
    getData(urlCustomers),
  ])
}

function postData(body, url) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    })
    .catch(error => {
      console.log("Fetch error: ", error)
      if (error instanceof TypeError) {
        alert("Sorry, there is an issue with our data server. Please try again later. ")
      } else if (error instanceof ReferenceError) {
        alert("There's an issue on our end, we're working on it.")
      } else {
        alert("An error occured, please try again later.")
      }
    })
}

export { getData, postData, getAllData } 