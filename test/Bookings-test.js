import chai from 'chai'
const expect = chai.expect
import { Bookings, Room } from '../src/classes/Bookings'
import {testDataCustomer, testDataRooms, testDataBookings} from '../src/data/test-data'

describe('Bookings', () => {
  let bookings 

  beforeEach(() => {
    bookings = new Bookings(testDataBookings, testDataRooms)
  })

  it('should be an instance of Bookings', () => {
    expect(bookings).to.be.an.instanceOf(Bookings)
  })

  it('should have an ID', () => {
    expect(bookings[0].bookingsId).to.equal("5fwrgu4i7k55hl6sz")
  })

  it('should have a user Id', () => {
    expect(bookings[0].bookingsUserId).to.equal(1)
  })

  it('should have a date', () => {
    expect(bookings.date).to.equal("2022/04/22")
  })

  it('should have a room number', () => {
    expect(bookings.roomNumber).to.equal(1)
  })

})