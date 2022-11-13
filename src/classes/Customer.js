const { testDataCustomer } = require("../data/test-data")

class Customer {
  constructor(customerData) {
    this.customerId = customerData.id
    this.name = customerData.name
    this.customerBookingsList = []
  }
  getCustomerIndex(customerData, username) {
    return customerData.findIndex((customer) => {
      return customer.id === username 
    })
  }
  checkCredentials(username, password, customerData) {
    let verified = false
    const userExists = customerData.filter((customer) => {
      return username === customer.Id
    })
    if (userExists && password === 'overlook2021') {
      verified = true
    } else {
      verified = false
      console.log('not verified')
    }
    return verified 
  }
}
// page loads and gets response of all data
// display loginpage is called simotaneous to init page
// display login page is shown
// init page takes in all data and assigns it to global variables
// instantiates bookings
// intantiates customer
// captures the index of the instantiated customer to hold for when we post and get data again
// calls the getCustomerBookings function on the instantiated customer
// log in page listens for user to input correct credentias
// if incorrect, a message appears otherwise the my booking page displays
// if correct, capture the index of the user from the users array and use that to intantiate a new customer
// reassign the testCustomer to that new instantiation
// instantiate bookings?? 
// run the following testCustomer.customerBookingsList = bookings.getCustomerBookings(testCustomer)

module.exports = { Customer }