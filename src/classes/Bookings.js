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
    console.log(allRoomTypes)
    return allRoomTypes
  }
  getAvailableRooms(date, type) {
    this.currAvailableRooms = this.allPotentialRooms
    date = date.split("-").join("/")
    const filteredBookingsConflictsByDate = this.allBookings.filter((booking) => {
      return booking.bookingDate === date
    })
    const removeConflictDates = this.currAvailableRooms.forEach((room, index) => {
      filteredBookingsConflictsByDate.forEach((conflict) => {
        if (room.roomId === conflict.roomId) {
          this.currAvailableRooms.splice(0, index)
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