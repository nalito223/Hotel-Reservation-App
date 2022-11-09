class Bookings {
  constructor(bookingsData) {
    this.bookingsId = bookingsData.id
    this.bookingsUserId = bookingsData.userID
    this.date = bookingsData.date
    this.roomNumber = bookingsData.roomNumber
  }
}

module.exports = { Bookings }