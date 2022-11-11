
class Customer {
  constructor(customerData) {
    this.customerId = customerData.id
    this.name = customerData.name 
    this.customerBookingsList = []
    // this.totalBookings = this.customerBookingsList.length
  }
}

module.exports = { Customer }