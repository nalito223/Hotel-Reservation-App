// imports 
import { postData, getAllData } from './apiCalls'
import './css/styles.css'
import { Customer } from './classes/Customer'
import { Bookings } from './classes/Bookings'

// api urls
const urlNewBooking = 'http://localhost:3001/api/v1/bookings'

// query selectors
const tableContainer = document.querySelector('.table-container')
const totalsContainer = document.querySelector('.totals-container')
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
const usernameInput = document.querySelector('.login-input-username')
const passwordInput = document.querySelector('.login-input-password')
const loginButton = document.querySelector('.login-button')
const signInForm = document.querySelector('.sign-in-form')
const signOutButton = document.querySelector('#sign-out-button')

// global variables
let testCustomer
let bookings
let customerData
let bookingsData
let roomData
const currentDate = new Date()
let day = currentDate.getDate()
let month = currentDate.getMonth()
let year = currentDate.getFullYear()
let calendarPastDisableDate
let calendarFutureDisableDate
let currCustomerIndex

// event listeners
window.addEventListener('load', () => {
  getAllData().then((response) => {
    initPage(response)
  })
})
bookRoomButton.addEventListener('click', displayBookRoomExperience)
myBookingsButton.addEventListener('click', displayMyBookings)
findRoomButton.addEventListener('click', (event) => event.preventDefault())
findRoomButton.addEventListener('click', filterAvailableRooms)
table.addEventListener('click', postBooking)
loginButton.addEventListener('click', evaluateLogin)
signOutButton.addEventListener('click', reloadPage)
document.addEventListener('keypress', event => {
  if (event.key === "Enter") {
    event.preventDefault()
    event.target.click()
  }
})

//functions
function reloadPage() {
  window.location.reload()
}

function postBooking(event) {
  let date = dateSelector.value.split("-").join("/")
  if (event.target.classList.contains('table-button')) {
    let body = {
      "userID": testCustomer.customerId,
      "date": `${date}`,
      "roomNumber": Number(event.target.id)
    }
    postData(body, urlNewBooking).then(() => {
      getAllData().then((response) => {
        customerData = response[2].customers
        bookingsData = response[0].bookings
        roomData = response[1].rooms
        bookings = new Bookings(bookingsData, roomData)
        testCustomer = new Customer(response[2].customers[currCustomerIndex])
        testCustomer.customerBookingsList = bookings.getCustomerBookings(testCustomer)
        filterAvailableRooms()
        displayTotals()
        if (table.innerHTML === '') {
          displayTableInstructions()
        }
      })
    })
  }
}

function filterAvailableRooms() {
  let date = dateSelector.value
  let type = tableSelect.value
  if (!date || date < calendarPastDisableDate || date > calendarFutureDisableDate) {
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
    <td tabindex="0">Room #${availableRoom.roomNumber} - ${dateSelector.value} </td>
    <td tabindex="0">${availableRoom.numBeds} ${availableRoom.bedSize} size bed(s)</td>
    <td tabindex="0">$${availableRoom.costPerNight} - ${availableRoom.roomType}/night</td>
    <td tabindex="0"><button class="table-button" id="${availableRoom.roomNumber}" tabindex="0">Book</button></td>
    </tr>
    `
  })
  if (table.innerText === '') {
    displayTableInstructions()
  }
}

function initPage(responseData) {
  customerData = responseData[2].customers
  bookingsData = responseData[0].bookings
  roomData = responseData[1].rooms
  bookings = new Bookings(bookingsData, roomData)
  testCustomer = new Customer(responseData[2].customers[2])
  testCustomer.customerBookingsList = bookings.getCustomerBookings(testCustomer)
  displayLogInPage()
}

function displayBookRoomExperience() {
  inputContainer.classList.remove('hidden')
  bookRoomButton.classList.add('selected-view')
  myBookingsButton.classList.remove('selected-view')
  myBookingsButton.setAttribute("aria-selected", false)
  bookRoomButton.setAttribute("aria-selected", true)
  displayHeaderText(`Welcome, ${testCustomer.name.split(' ')[0]}!`)
  displayBannerText('Start booking by selecting a date and optional room type below')
  displayTableInstructions()
  displayFilterOptions()
  disableDatesInCalendar()
  displayTotals()
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
  <div class="no-results" tabindex="0">*No results. Select a new date and optional room type then click 'Find room'.</div>
  <div class="no-results" tabindex="0"> Note: Our sincere apologies if there is no availability on your requested date. Reservations can be made no later than two days in advance and no sooner than one year into the future.
  `
}

function displayMyBookings() {
  mainContainer.classList.remove('add-padding')
  signInForm.classList.add('hidden')
  tableContainer.classList.remove('hidden')
  totalsContainer.classList.remove('hidden')
  navContainerRight.classList.remove('hidden')
  inputContainer.classList.remove('hidden')
  navContainerLeft.classList.remove('loginStyling')
  inputContainer.classList.add('hidden')
  myBookingsButton.classList.add('selected-view')
  bookRoomButton.classList.remove('selected-view')
  myBookingsButton.setAttribute("aria-selected", true)
  bookRoomButton.setAttribute("aria-selected", false)
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
    <td tabindex="0">${booking.bookingDate} - Room #${booking.roomNumber}</td>
    <td tabindex="0">${booking.numBeds} ${booking.bedSize} size bed(s)</td>
    <td tabindex="0">$${booking.costPerNight}/night</td>
    <td tabindex="0">ID: ${booking.bookingId}</td>
    </tr>
    `
  })
}

function sortBookingsByDate() {
  testCustomer.customerBookingsList = testCustomer.customerBookingsList.sort((a, b) => {
    return Number(a.bookingDate.split('/').join('')) - Number(b.bookingDate.split('/').join(''))
  })
}

function displayLogInPage() {
  usernameInput.value = ''
  passwordInput.value = ''
  tableContainer.classList.add('hidden')
  totalsContainer.classList.add('hidden')
  navContainerRight.classList.add('hidden')
  inputContainer.classList.add('hidden')
  navContainerLeft.classList.add('loginStyling')
  mainContainer.classList.add('add-padding')
  textBanner.innerText = 'Please sign in to get started'
  navContainerLeft.innerText = "Welcome!"
}

function evaluateLogin(event) {
  event.preventDefault()
  let username = Number(usernameInput.value.slice(8))
  let password = passwordInput.value
  let verified = testCustomer.checkCredentials(username, password, customerData)
  if (verified) {
    currCustomerIndex = testCustomer.getCustomerIndex(customerData, username)
    bookings = new Bookings(bookingsData, roomData)
    testCustomer = new Customer(customerData[currCustomerIndex])
    testCustomer.customerBookingsList = bookings.getCustomerBookings(testCustomer)
    displayMyBookings()
  } else {
    textBanner.innerText = '*Incorrect username or password. Please try again. Case sensitive.'
  }
}




