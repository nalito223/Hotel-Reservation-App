import chai from 'chai'
const expect = chai.expect
import { Room } from '../src/classes/Room'
import { testDataCustomer, testDataRooms, testDataBookings } from '../src/data/test-data'

describe('Room', () => {
  let room
  let booking
  let newRoom

  beforeEach(() => {
    room = {
      number: 1,
      roomType: "residential suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 358.4
    }

    booking = {
      id: "5fwrgu4i7k55hl6sz",
      userID: 1,
      date: "2022/04/22",
      roomNumber: 1
    }

    newRoom = new Room(room, booking)

  })

  it('should be an instance of Room', () => {
    expect(newRoom).to.be.an.instanceOf(Room)
  })

  it('should have a number', () => {
    expect(newRoom.number).to.equal(1)
  })

  it('should have a room type', () => {
    expect(newRoom.roomType).to.equal("residential suite")
  })

  it('should have a bidet', () => {
    expect(newRoom.bidet).to.equal(true)
  })

  it('should have a bedsize', () => {
    expect(newRoom.bedSize).to.equal("queen")
  })

  it('should have a number of beds', () => {
    expect(room.numBeds).to.equal(1)
  })

  it('should have a cost per night', () => {
    expect(newRoom.costPerNight).to.equal(358.4)
  })
  it('should have an ID', () => {
    expect(newRoom.bookingId).to.equal("5fwrgu4i7k55hl6sz")
  })

  it('should have a user Id', () => {
    expect(newRoom.userId).to.equal(1)
  })

  it('should have a date', () => {
    expect(newRoom.bookingDate).to.equal("2022/04/22")
  })

  it('should have a room number', () => {
    expect(newRoom.roomNumber).to.equal(1)
  })

})
