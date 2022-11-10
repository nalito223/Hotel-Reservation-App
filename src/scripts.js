import { getData, postData, getAllData } from './apiCalls'

const urlCustomers = 'http://localhost:3001/api/v1/customers'
const urlRooms = 'http://localhost:3001/api/v1/rooms'
const urlBookings = 'http://localhost:3001/api/v1/bookings'
const urlSingleCustomer = 'http://localhost:3001/api/v1/customers/'
const urlNewBooking = 'http://localhost:3001/api/v1/bookings'

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'




// getData(urlCustomers).then((data) => {
//   console.log(data.customers[0])
// })
// getData(urlRooms).then((data) => {
//   console.log(data.rooms[0])
// })

// getData(urlBookings).then((data) => {
//   console.log(data.bookings[0])
// })



