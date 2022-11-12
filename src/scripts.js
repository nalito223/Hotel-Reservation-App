// imports 
import { getData, postData, getAllData } from './apiCalls'
import './css/styles.css'
import { Customer } from './classes/Customer'
import { Bookings } from './classes/Bookings'

// api urls
const urlCustomers = 'http://localhost:3001/api/v1/customers'
const urlRooms = 'http://localhost:3001/api/v1/rooms'
const urlBookings = 'http://localhost:3001/api/v1/bookings'
let urlSingleCustomer = 'http://localhost:3001/api/v1/customers/'
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
const bookRoomButton = document.querySelector('#book-a-room-button')
const findRoomButton = document.querySelector('.find-room-button')
const dateSelector = document.querySelector('.date-selector')
const tableSelect = document.querySelector('.table-select')

// global variables
let testCustomer
let bookings
let customerData
let bookingsData
let roomData
let customerBookings
let randomIndex
const currentDate = new Date()
let day = currentDate.getDate()
let month = currentDate.getMonth()
let year = currentDate.getFullYear()
let calendarPastDisableDate
let calendarFutureDisableDate
let currCustomerIndex
let customerID

// event listeners
window.addEventListener('load', () => {
  getAllData().then((response) => {
    console.log(response)
    initPage(response)
  })
})
bookRoomButton.addEventListener('click', displayBookRoomExperience)
myBookingsButton.addEventListener('click', displayMyBookings)
findRoomButton.addEventListener('click', (event) => event.preventDefault())
// table.addEventListener('click', (event) => {
// })
findRoomButton.addEventListener('click', filterAvailableRooms)
table.addEventListener('click', postBooking)

//functions
function postBooking(event) {
  let date = dateSelector.value.split("-").join("/")
  if (event.target.classList.contains('table-button')) {
    let body = {
      "userID": testCustomer.customerId,
      "date": `${date}`,
      "roomNumber": Number(event.target.id)
    }
    postData(body, urlNewBooking).then((response) => {
      console.log(response)
      getAllData().then((response) => {
        console.log(response)
        customerData = response[2].customers
        bookingsData = response[0].bookings
        roomData = response[1].rooms
        bookings = new Bookings(bookingsData, roomData)
        testCustomer = new Customer(response[2].customers[3])
        testCustomer.customerBookingsList = bookings.getCustomerBookings(testCustomer)
        filterAvailableRooms()
      })
    })
  }
}

function filterAvailableRooms() {
  let date = dateSelector.value
  let type = tableSelect.value
  if (!date || date < calendarPastDisableDate || date > calendarFutureDisableDate) {
    // if (!date) {
    displayTableInstructions()
  } else {
    bookings.getAvailableRooms(date, type)
    displayFilteredTableView()
  }
}

function displayFilteredTableView() {
  table.innerHTML = ''
  bookings.currAvailableRooms.forEach((availableRoom) => {
    table.innerHTML += `
    <tr>
    <td>Room #${availableRoom.roomNumber} - ${availableRoom.roomType}</td>
    <td>${availableRoom.numBeds} ${availableRoom.bedSize} size bed(s)</td>
    <td>$${availableRoom.costPerNight}/night</td>
    <td><button class="table-button" id="${availableRoom.roomNumber}">Book</button></td>
    </tr>
    `
  })
}


function initPage(response) {
  customerData = response[2].customers
  bookingsData = response[0].bookings
  roomData = response[1].rooms

  bookings = new Bookings(bookingsData, roomData)
  testCustomer = new Customer(response[2].customers[3])
  currCustomerIndex = testCustomer.getCustomerIndex(customerData, testCustomer)
  testCustomer.customerBookingsList = bookings.getCustomerBookings(testCustomer)
  displayMyBookings()
  // displayLogInPage()
}

function displayBookRoomExperience() {
  inputContainer.classList.remove('hidden')
  bookRoomButton.classList.add('selected-view')
  myBookingsButton.classList.remove('selected-view')
  displayHeaderText(`Welcome, ${testCustomer.name.split(' ')[0]}!`)
  displayBannerText('Start booking by selecting a date and room type below')
  displayTableInstructions()
  displayFilterOptions()
  disableDatesInCalendar()
}

function disableDatesInCalendar() {
  calendarPastDisableDate = `${year}-${month + 1}-${day + 2}`
  calendarFutureDisableDate = `${year + 1}-${month}-${day}`
  dateSelector.setAttribute("min", calendarPastDisableDate)
  dateSelector.setAttribute("max", calendarFutureDisableDate)
}

function displayFilterOptions() {
  tableSelect.innerHTML = '<option>Choose type...</option>'
  bookings.allRoomTypes.forEach((type) => {
    tableSelect.innerHTML += `
    <option id="${type}">${type}</option>
    `
  })
}

function displayTableInstructions() {
  table.innerHTML = `
  <div class="no-results">*No results. Select a date and room type then click 'Find room'.</div>
  <div class="no-results"> Note: Reservations can be made no later than two days in advance and no sooner than one year into the future.
  `
}

function displayMyBookings() {
  inputContainer.classList.add('hidden')
  myBookingsButton.classList.add('selected-view')
  bookRoomButton.classList.remove('selected-view')
  displayHeaderText(`Welcome, ${testCustomer.name.split(' ')[0]}!`)
  displayBannerText('Review your bookings below')
  displayTableViewMyBookings()
  displayTotals()
}

function displayTotals() {
  totalBookings.innerText = `Total bookings: ${testCustomer.customerBookingsList.length}`
  totalSpent.innerText = `Total spent: $${testCustomer.customerBookingsList.reduce((acc, curr) => {
    return acc += curr.costPerNight
  }, 0).toFixed(2)}`
}

function displayHeaderText(text) {
  navContainerLeft.innerText = text
}

function displayBannerText(text) {
  viewTextContainer.innerText = text
}

function displayTableViewMyBookings() {
  sortBookingsByDate()
  table.innerHTML = ''
  testCustomer.customerBookingsList.forEach((booking) => {
    table.innerHTML += `
    <tr>
    <td>${booking.bookingDate} - Room #${booking.roomNumber}</td>
    <td>${booking.numBeds} ${booking.bedSize} size bed(s)</td>
    <td>$${booking.costPerNight}/night</td>
    <td>ID: ${booking.bookingId}</td>
    </tr>
    `
  })
}

function sortBookingsByDate() {
  testCustomer.customerBookingsList = testCustomer.customerBookingsList.sort((a, b) => {
    return Number(a.bookingDate.split('/').join('')) - Number(b.bookingDate.split('/').join(''))
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
