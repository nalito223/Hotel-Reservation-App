// imports 
import { getData, postData, getAllData } from './apiCalls'
import './css/styles.css';

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

// global variables
let testCustomer

// event listeners
window.addEventListener('load', () => {
  getAllData().then((response) => {
    console.log(response)
    initPage(response)
  })
})

// functions 
function initPage(response) {
  //replace line below with function that grabs the customer who logs in 
  testCustomer = response[2].customers[0]
  console.log(testCustomer)
  displayMyBookings()
  // displayLogInPage()
}


function displayMyBookings() {
  navContainerLeft.innerText = `Welcome, ${testCustomer.name.split(' ')[0]}!`
  
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