// imports 
import { getData, postData, getAllData } from './apiCalls'
import './css/styles.css';
import { Customer } from './classes/Customer'
import { Bookings } from './classes/Bookings'

// api urls
const urlCustomers = 'http://localhost:3001/api/v1/customers'
const urlRooms = 'http://localhost:3001/api/v1/rooms'
const urlBookings = 'http://localhost:3001/api/v1/bookings'
const urlSingleCustomer = 'http://localhost:3001/api/v1/customers/'
const urlNewBooking = 'http://localhost:3001/api/v1/bookings'

// query selectors
const tableContainer = document.querySelector('.table-container')
const totalsContainer = document.querySelector('.totals-container')
const mainNavContainer = document.querySelector('.main-nav-container')
const mainContainer = document.querySelector('.main-container')
const navContainerRight = document.querySelector('.nav-container-right')
const inputContainer = document.querySelector('.input-container')
const navContainerLeft = document.querySelector('.nav-container-left')
const textBanner = document.querySelector('.text-banner')
const table = document.querySelector('table')
const viewTextContainer = document.querySelector('.view-text-container')
const myBookingsButton = document.querySelector('#my-bookings-button')
const totalBookings = document.querySelector('#total-bookings')
const totalSpent = document.querySelector('#total-spent')

// global variables
let testCustomer
let bookings 
let customerData 
let bookingsData
let roomData
let customerBookings 

// event listeners
window.addEventListener('load', () => {
  getAllData().then((response) => {
    console.log(response)
    initPage(response)
  })
})

// functions 
function initPage(response) {
  customerData = response[2].customers
  bookingsData = response[0].bookings
  roomData = response[1].rooms

  bookings = new Bookings(bookingsData, roomData)
  testCustomer = new Customer(response[2].customers[2])
  testCustomer.customerBookingsList = bookings.getCustomerBookings(testCustomer)
  
  displayMyBookings()
  // displayLogInPage()
}

function displayMyBookings() {
  myBookingsButton.classList.add('selected-view')
  displayHeaderText(`Welcome, ${testCustomer.name.split(' ')[0]}!`)
  displayBannerText('Review your bookings below')
  displayTableView()
  displayTotals()
  
  console.log(testCustomer.customerBookingsList[0])
}

function displayTotals() {
 totalBookings.innerText = `Total bookings: ${testCustomer.customerBookingsList.length}`
 totalSpent.innerText =  `Total spent: $${testCustomer.customerBookingsList.reduce((acc, curr) => {
   return acc += curr.costPerNight
 }, 0).toFixed(2)}`
}

function displayHeaderText(text) {
  navContainerLeft.innerText = text 
}

function displayBannerText(text) {
  viewTextContainer.innerText = text
}

function displayTableView() {
  table.innerHTML = ''
  inputContainer.classList.add('hidden')
  testCustomer.customerBookingsList.forEach((booking) => {
    table.innerHTML += `
    <tr>
    <td>Room ${booking.roomNumber} - ${booking.roomType}</td>
    <td>${booking.numBeds} ${booking.bedSize} size bed(s)</td>
    <td>$${booking.costPerNight}/night</td>
    <td>ID: ${booking.bookingId}</td>
    </tr>
    `
  })
}

// function displayLogInPage() {
//   tableContainer.classList.add('hidden')
//   totalsContainer.classList.add('hidden')
//   navContainerRight.classList.add('hidden')
//   textBanner.innerText = 'Log in to get started'
//   inputContainer.innerHTML = `

//   <div class="sign-in-container">
//   <label for="uname">
//     <b>Username</b>
//   </label>
//   <input class="login-input-username" type="text" placeholder="Enter Username" name="uname" required>
//   <label for="psw">
//     <b>Password</b>
//   </label>
//   <input class="login-input-password" type="password" placeholder="Enter Password" name="psw" required>
//   <button class="login-button" type="submit">Log in</button>
// </div>
//   `
//   navContainerLeft.innerText = "Welcome!"
// }

let body = { "userID": 48, "date": "2019/09/23", "roomNumber": 4 }

postData(body, urlNewBooking).then((response) => {
  console.log("FETCH POST",response)
})