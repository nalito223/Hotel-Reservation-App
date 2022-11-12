const { Room } = require("./Room")

class Bookings {
  constructor(bookingsData, roomsData) {
    this.bookingsData = bookingsData
    this.roomsData = roomsData
    this.allBookings = this.getAllBookings()
    this.allRoomTypes = this.getAllRoomTypes()
    this.allPotentialRooms = this.getAllPotentialRooms()
    this.currAvailableRooms = []
  }
  getAllBookings() {
    const a = this.bookingsData.reduce((acc, booking) => {
      this.roomsData.forEach((room) => {
        if (booking.roomNumber === room.number) {
          acc.push(new Room(room, booking))
        }
      })
      return acc
    }, [])
    return a
  }

  getCustomerBookings(customer) {
    const a = this.allBookings.filter((booking) => {
      return booking.userId === customer.customerId
    })
    return a
  }
  getAllRoomTypes() {
    let allRoomTypes = []
    this.allBookings.forEach((booking) => {
      if (!allRoomTypes.includes(booking.roomType)) {
        allRoomTypes.push(booking.roomType)
      }
    })
    return allRoomTypes
  }
  getAvailableRooms(inputDate, type) {
    const allUniqueRooms = this.getAllPotentialRooms()
    this.currAvailableRooms = allUniqueRooms.sort((a, b) => {
      return a.roomNumber - b.roomNumber
    })
    inputDate = inputDate.split("-").join("/")

    let filteredArray = []

    this.bookingsData.forEach((room) => {
      if (inputDate === room.date) {
        filteredArray.push(room)
      }
    })

    this.currAvailableRooms.forEach((curr, index) => {
      filteredArray.forEach((conflictRoom) => {
        if (curr.roomNumber === conflictRoom.roomNumber) {
          this.currAvailableRooms.splice(index, 1)
        }
      })
    })

    if (type !== 'Choose type...') {
      const filteredByTag = this.currAvailableRooms.filter((room) => {
        return room.roomType === type
      })
      this.currAvailableRooms = filteredByTag
    } else {
      this.currAvailableRooms = this.currAvailableRooms
    }
    // console.log("length curr avail", this.currAvailableRooms.length)
    // console.log("length potential rooms", this.allPotentialRooms)

  }

  getAllPotentialRooms() {
    let uniqueRooms = []
    const uniqueRoomNumbers = this.allBookings.reduce((acc, curr) => {
      if (!acc.includes(curr.roomNumber))
        acc.push(curr.roomNumber)
      return acc
    }, [])

    const roomMatch = uniqueRoomNumbers.forEach((roomNum) => {
      const room = this.allBookings.find((roomInfo) => {
        return roomInfo.roomNumber === roomNum
      })
      uniqueRooms.push(room)
    })
    return uniqueRooms
  }
}

module.exports = { Bookings }