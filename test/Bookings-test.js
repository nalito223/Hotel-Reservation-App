import chai from 'chai'
const expect = chai.expect
import { Bookings } from '../src/classes/Bookings'
import {testDataCustomer, testDataRooms, testDataBookings} from '../src/data/test-data'

describe('Bookings', () => {
  let bookings 
  // console.log("LOOK HERE +++", testDataBookings.bookings[0])

  beforeEach(() => {
    bookings = new Bookings(testDataBookings.bookings[0])
  })

  it('should be an instance of Bookings', () => {
    expect(bookings).to.be.an.instanceOf(Bookings)
  })

  it('should have an ID', () => {
    expect(bookings.bookingsId).to.equal("5fwrgu4i7k55hl6sz")
  })

  it('should have a user Id', () => {
    expect(bookings.bookingsUserId).to.equal(9)
  })

  it('should have a date', () => {
    expect(bookings.date).to.equal("2022/04/22")
  })

  it('should have a room number', () => {
    expect(bookings.roomNumber).to.equal(15)
  })

})