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
    expect(customer.customerId).to.equal(1)
  })

  it('should get customer index', () => {
    let customerData = testDataCustomer.customers
    const index = customer.getCustomerIndex(customerData, 2)
    expect(index).to.equal(1)
    const index2 = customer.getCustomerIndex(customerData, 30)
    expect(index2).to.equal(-1)
  })

  it('should test if log in credentials are verified', () => {
    let customerData = testDataCustomer.customers
    let password = "overlook2021"
    let username = 2
    const verified = customer.checkCredentials(username, password, customerData)
    expect(verified).to.equal(true)

  })
  it('should test if log in password is not verified', () => {
    let customerData = testDataCustomer.customers
    let password = "Overlook2021"
    let username = 2
    const verified = customer.checkCredentials(username, password, customerData)
    expect(verified).to.equal(false)
  })

  it('should test if log in username is not verified', () => {
    let customerData = testDataCustomer.customers
    let password = "overlook2021"
    let username = 600
    const verified = customer.checkCredentials(username, password, customerData)
    expect(verified).to.equal(false)
  })
})
