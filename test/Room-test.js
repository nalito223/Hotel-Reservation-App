import chai from 'chai'
const expect = chai.expect
import { Room } from '../src/classes/Room'
import {testDataCustomer, testDataRooms, testDataBookings} from '../src/data/test-data'

describe('Room', () => {
  let room 

  beforeEach(() => {
    room = new Room(testDataRooms.rooms[0])
  })

  it('should be an instance of Room', () => {
    expect(room).to.be.an.instanceOf(Room)
  })

  it('should have a number', () => {
    expect(room.number).to.equal(1)
  })

  it('should have a room type', () => {
    expect(room.roomType).to.equal("residential suite")
  })

  it('should have a bidet', () => {
    expect(room.bidet).to.equal(true)
  })

  it('should have a bedsize', () => {
    expect(room.bedSize).to.equal("queen")
  })

  it('should have a number of beds', () => {
    expect(room.numBeds).to.equal(1)
  })

  it('should have a cost per night', () => {
    expect(room.costPerNight).to.equal(358.4)
  })

})
