// import {testDataCustomer, testDataRooms, testDataBookings} from '../data'

class Customer {
  constructor(customerData) {
    this.id = customerData.id
    this.name = customerData.name 
  }
}

module.exports = { Customer }