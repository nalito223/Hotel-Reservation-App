const { Room } = require("./Room")

class Bookings {
  constructor(bookingsData, roomsData) {
    this.bookingsData = bookingsData
    this.roomsData = roomsData
    this.allBookings = this.getAllBookings()
    this.allRoomTypes = this.getAllRoomTypes()
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
    // console.log('a',a)
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
}

module.exports = { Bookings }