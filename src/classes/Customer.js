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
    const userExists = customerData.find((customer) => {
      return username === customer.id
    })
    if (userExists && password === 'overlook2021') {
      verified = true
    } else {
      verified = false
    }
    return verified
  }
}

module.exports = { Customer }