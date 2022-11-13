const { testDataCustomer } = require("../data/test-data")

class Customer {
  constructor(customerData) {
    this.customerId = customerData.id
    this.name = customerData.name
    this.customerBookingsList = []
  }
  getCustomerIndex(customerData, testCustomer) {
    let customerIndex = 0
    customerData.forEach((customer, index) => {
      if (customer.id === testCustomer.customerId) {
        customerIndex = index 
      }
    })
    return customerIndex
  }
}

module.exports = { Customer }