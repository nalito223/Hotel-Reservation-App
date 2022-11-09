import chai from 'chai'
const expect = chai.expect
import { Customer } from '../src/classes/Customer'
import {testDataCustomer, testDataRooms, testDataBookings} from '../src/data/test-data'

describe('Customer', () => {
  let customer 

  beforeEach(() => {
    customer = new Customer(testDataCustomer.customers[0])
  })

  it('should be an instance of Customer', () => {
    expect(customer).to.be.an.instanceOf(Customer)
  })

  it('should have a name', () => {
    expect(customer.name).to.equal("Leatha Ullrich")
  })

  it('should have an ID', () => {
    expect(customer.id).to.equal(1)
  })

})
