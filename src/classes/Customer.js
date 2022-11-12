class Customer {
  constructor(customerData) {
    this.customerId = customerData.id
    this.name = customerData.name
    this.customerBookingsList = []
  }
  getCustomerIndex(customerData) {
    customerData.find((customer) => {
      return customer.customerId === this.customerId
    })
  }
}

module.exports = { Customer }