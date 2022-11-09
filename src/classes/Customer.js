class Customer {
  constructor(customerData) {
    this.customerId = customerData.id
    this.name = customerData.name 
  }
}

module.exports = { Customer }