import chai from 'chai'
const expect = chai.expect
import { Bookings, Room } from '../src/classes/Bookings'
import {testDataCustomer, testDataRooms, testDataBookings} from '../src/data/test-data'

describe('Bookings', () => {
  let bookings 
  
  beforeEach(() => {
    testDataRooms = testDataRooms.rooms
    testDataBookings = testDataBookings.bookings
    newBookings = new Bookings(testDataBookings, testDataRooms)
    console.log(bookings)
  })

  it('should be an instance of Bookings', () => {
    expect(newBookings).to.be.an.instanceOf(Bookings)
  })

  it('should have booking data', () => {
    console.log("LOOK HERE", bookings)
    expect(newBookings.bookingsData).to.equal(testDataBookings)
  })

  
})