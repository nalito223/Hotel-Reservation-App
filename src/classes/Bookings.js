const { Room } = require("./Room")

class Bookings {
  constructor(bookingsData, roomsData) {
    this.bookingsData = bookingsData
    this.roomsData = roomsData
    this.allBookings = this.getAllBookings()
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
}

module.exports = { Bookings }