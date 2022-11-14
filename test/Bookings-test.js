import chai from 'chai'
const expect = chai.expect
import { Bookings, Room } from '../src/classes/Bookings'
import { testDataCustomer, testDataRooms, testDataBookings } from '../src/data/test-data'

describe('Bookings', () => {
  let roomsData
  let bookingsData
  let newBookings
  let customer

  beforeEach(() => {

    customer = {
      customerId: 1,
      name: "Leatha Ullrich"
    }

    roomsData = [
      {
        number: 1,
        roomType: "residential suite",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 358.4
      },
      {
        number: 2,
        roomType: "suite",
        bidet: false,
        bedSize: "full",
        numBeds: 2,
        costPerNight: 477.38
      },
      {
        number: 3,
        roomType: "single room",
        bidet: false,
        bedSize: "king",
        numBeds: 1,
        costPerNight: 491.14
      },
      {
        number: 4,
        roomType: "suite",
        bidet: false,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 429.44
      },
      {
        number: 5,
        roomType: "single room",
        bidet: true,
        bedSize: "queen",
        numBeds: 2,
        costPerNight: 340.17
      },
      {
        number: 5,
        roomType: "single room",
        bidet: true,
        bedSize: "queen",
        numBeds: 2,
        costPerNight: 340.17
      }]

    bookingsData = [
      {
        id: "5fwrgu4i7k55hl6sz",
        userID: 1,
        date: "2022/04/22",
        roomNumber: 1
      },
      {
        id: "5fwrgu4i7k55hl6t5",
        userID: 43,
        date: "2022/04/22",
        roomNumber: 2
      },
      {
        id: "5fwrgu4i7k55hl6t6",
        userID: 13,
        date: "2022/01/10",
        roomNumber: 3
      },
      {
        id: "5fwrgu4i7k55hl6t7",
        userID: 20,
        date: "2022/02/16",
        roomNumber: 4
      },
      {
        id: "5fwrgu4i7k55hl6t8",
        userID: 1,
        date: "2022/02/05",
        roomNumber: 5
      }]

    newBookings = new Bookings(bookingsData, roomsData)
  })

  it('should be an instance of Bookings', () => {
    expect(newBookings).to.be.an.instanceOf(Bookings)
  })

  it('should have booking data', () => {
    expect(newBookings.bookingsData).to.deep.equal(bookingsData)
  })

  it('should have rooms data', () => {
    expect(newBookings.roomsData).to.deep.equal(roomsData)
  })

  it('should be able to compile all bookings', () => {
    const index0 = {
      number: 1,
      roomType: 'residential suite',
      bidet: true,
      bedSize: 'queen',
      numBeds: 1,
      costPerNight: 358.4,
      bookingId: '5fwrgu4i7k55hl6sz',
      userId: 1,
      bookingDate: '2022/04/22',
      roomNumber: 1
    }

    const index3 = {
      number: 4,
      roomType: 'suite',
      bidet: false,
      bedSize: 'queen',
      numBeds: 1,
      costPerNight: 429.44,
      bookingId: '5fwrgu4i7k55hl6t7',
      userId: 20,
      bookingDate: '2022/02/16',
      roomNumber: 4
    }

    expect(newBookings.allBookings[0]).to.deep.equal(index0)
    expect(newBookings.allBookings[3]).to.deep.equal(index3)
  })

  it('make an array of unique room types', () => {
    const uniqueTypes = ["residential suite", "suite", "single room"]

    expect(newBookings.allRoomTypes).to.deep.equal(uniqueTypes)
    expect(newBookings.allRoomTypes.length).to.equal(3)
  })

  it('make an array of all potential rooms', () => {
    const uniqueRooms = [
      {
        number: 1,
        roomType: 'residential suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 358.4,
        bookingId: '5fwrgu4i7k55hl6sz',
        userId: 1,
        bookingDate: '2022/04/22',
        roomNumber: 1
      },
      {
        number: 2,
        roomType: 'suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 477.38,
        bookingId: '5fwrgu4i7k55hl6t5',
        userId: 43,
        bookingDate: '2022/04/22',
        roomNumber: 2
      },
      {
        number: 3,
        roomType: 'single room',
        bidet: false,
        bedSize: 'king',
        numBeds: 1,
        costPerNight: 491.14,
        bookingId: '5fwrgu4i7k55hl6t6',
        userId: 13,
        bookingDate: '2022/01/10',
        roomNumber: 3
      },
      {
        number: 4,
        roomType: 'suite',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 429.44,
        bookingId: '5fwrgu4i7k55hl6t7',
        userId: 20,
        bookingDate: '2022/02/16',
        roomNumber: 4
      },
      {
        number: 5,
        roomType: 'single room',
        bidet: true,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 340.17,
        bookingId: '5fwrgu4i7k55hl6t8',
        userId: 1,
        bookingDate: '2022/02/05',
        roomNumber: 5
      },

    ]

    expect(newBookings.allPotentialRooms).to.deep.equal(uniqueRooms)
    expect(newBookings.allRoomTypes.length).to.equal(3)
  })

  it('should start with no available rooms', () => {
    expect(newBookings.currAvailableRooms).to.deep.equal([])
    expect(newBookings.currAvailableRooms.length).to.equal(0)
  })

  it('should filter available rooms by date availability', () => {
    let inputDate = '2022-04-22'
    let type = 'Choose type...'
    let availableRoom = [
      {
        number: 3,
        roomType: 'single room',
        bidet: false,
        bedSize: 'king',
        numBeds: 1,
        costPerNight: 491.14,
        bookingId: '5fwrgu4i7k55hl6t6',
        userId: 13,
        bookingDate: '2022/01/10',
        roomNumber: 3
      },
      {
        number: 4,
        roomType: 'suite',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 429.44,
        bookingId: '5fwrgu4i7k55hl6t7',
        userId: 20,
        bookingDate: '2022/02/16',
        roomNumber: 4
      },
      {
        number: 5,
        roomType: 'single room',
        bidet: true,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 340.17,
        bookingId: '5fwrgu4i7k55hl6t8',
        userId: 1,
        bookingDate: '2022/02/05',
        roomNumber: 5
      }]

    newBookings.getAvailableRooms(inputDate, type)

    expect(newBookings.currAvailableRooms).to.deep.equal(availableRoom)
    expect(newBookings.currAvailableRooms.length).to.equal(3)
  })

  it('should filter available rooms by type and date availability', () => {
    let inputDate = '2022-04-22'
    let type = 'suite'
    let availableRooms = [{
      number: 4,
      roomType: 'suite',
      bidet: false,
      bedSize: 'queen',
      numBeds: 1,
      costPerNight: 429.44,
      bookingId: '5fwrgu4i7k55hl6t7',
      userId: 20,
      bookingDate: '2022/02/16',
      roomNumber: 4
    }]

    newBookings.getAvailableRooms(inputDate, type)

    expect(newBookings.currAvailableRooms).to.deep.equal(availableRooms)
    expect(newBookings.currAvailableRooms.length).to.equal(1)
  })

  it('should get all bookings for a customer', () => {
    const customerBookings = [
      {
        number: 1,
        roomType: 'residential suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 358.4,
        bookingId: '5fwrgu4i7k55hl6sz',
        userId: 1,
        bookingDate: '2022/04/22',
        roomNumber: 1
      },
      {
        number: 5,
        roomType: 'single room',
        bidet: true,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 340.17,
        bookingId: '5fwrgu4i7k55hl6t8',
        userId: 1,
        bookingDate: '2022/02/05',
        roomNumber: 5
      },
      {
        number: 5,
        roomType: 'single room',
        bidet: true,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 340.17,
        bookingId: '5fwrgu4i7k55hl6t8',
        userId: 1,
        bookingDate: '2022/02/05',
        roomNumber: 5
      }
    ]

    expect(newBookings.getCustomerBookings(customer)).to.deep.equal(customerBookings)
    expect(newBookings.getCustomerBookings(customer).length).to.equal(3)
  })

})