class Room {
  constructor({ name, bookings, rate, discount }) {
    this.name = name;
    this.bookings = bookings; //array
    this.rate = rate; // en cents
    this.discount = discount; //porcentaje
  }
  isOccupied(date) {
    // si la habitación no esta reservada en una fecha devuelve falso.
    // si la habitación esta ocupada devuelve verdadero

    for (let i = 0; i <= this.bookings.length; i++) {
      const booked = this.bookings[i];
      if (date >= booked.checkIn && date < booked.checkOut) {
        
        return true;
      }else {
       
        return false;
      }
    }
  }

  occupancyPercentage(startDate, endDate) {
    //devuelve el porcentaje de días ocupación entre el rango de fechas proporcionado.
    const dates = dateArray(startDate, endDate);
   
    occupedDaysBooking = [];
    for (let date of dates) {
      if (this.isOccupied(date) === true) {
        occupedDaysBooking.push(date);
      }
      //el total de días de ocupación * 100 entre el total de días entre las dos fechas
      const percentageDays = (occupedDaysBooking.lenght/dates)*100;
      return percentageDays;
    }
  }
}

class Booking {
  constructor({ name, email, checkIn, checkOut, discount, room }) {
    this.name = name;
    this.email = email;
    this.checkIn = new Date(checkIn); //date
    this.checkOut = new Date(checkOut); //date
    this.discount = discount; //porcentaje
    this.room = room; //objeto {name:"canada", bookings:[booking1, booking2], rate:305, discount:20}
  }
  getFee() {
    //devuelve el precio final (incluidos descuentos de habitación y de la reserva)
    const rate = this.room.rate;
    const discountRoom = rate * (this.room.discount / 100);
    const discountBooking = rate * (this.discount / 100);
    const totalRate = rate - discountBooking - discountRoom;

    return totalRate;
  }
}

function totalOccupancyPercentage(rooms, startDate, endDate) {
  //devuelve el porcentaje de ocupación total de las habitaciones del array.

  const arrayRoomsOccupacy = [];

  for (let i = 0; i < rooms.lenght; i++) {
    arrayRoomsOccupacy.push(rooms[i].occupancyPercentage(startDate, endDate));
  }

  //sumar el array de habitaciones ocupadas
  const totalRoomsOccupacy = arrayRoomsOccupacy.reduce(
    (acc, roomsOccupacy) => acc + roomsOccupacy,
    0
  );

  //calcular el porcentaje (habitaciones ocupadas/total habitaciones)
  const totalPercentage = (totalRoomsOccupacy / rooms.lenght) * 100;

  return Math.round(totalPercentage);
}

function availableRooms(rooms, startDate, endDate) {
  //devuelve todas las habitaciones del array que NO están ocupadas entre las fechas
    const dates = dateArray(startDate, endDate);
    const arrayAvailableRooms = [];
    for (let i = 0; i<rooms.lenght; i++ ){
        if(rooms[i].isOccupied(dates) === false)
        arrayAvailableRooms.push(rooms[i]);
    }
    return arrayAvailableRooms.length > 0 ? arrayAvailableRooms : "Total occupied rooms"
   

}

module.exports = { Room, Booking, totalOccupancyPercentage, availableRooms };
