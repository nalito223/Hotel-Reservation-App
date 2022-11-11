
class Customer {
  constructor(customerData) {
    this.customerId = customerData.id
    this.name = customerData.name 
    this.customerBookingsList = []
  }
}

module.exports = { Customer }