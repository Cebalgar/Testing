class Room {
  constructor({ name, bookings, rate, discount }) {
    this.name = name;
    this.bookings = bookings; //array
    this.rate = rate; // en cents
    this.discount = discount; //porcentaje
  }


 dateArray(startDate, endDate){
       const date = new Date(startDate.getTime());
       const dates = [];
       while (date <= endDate){
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
       }
       return dates;
      }
      // const d1 = new Date('2022-01-18');
      // const d2 = new Date('2022-01-24')
      // console.log(dateArray(d1, d2));

  isOccupied(date) {
    // si la habitación no esta reservada en una fecha devuelve falso.
    // si la habitación esta ocupada devuelve verdadero

    for (let i = 0; i <= this.bookings.length; i++) {
      const booked = this.bookings[i];
      if (date >= booked.checkIn && date < booked.checkOut) { 
        return true;
      }  
      return false; 
    }
         
  };
  

  occupancyPercentage(startDate, endDate) {
    //devuelve el porcentaje de días ocupación entre el rango de fechas proporcionado.

    const dates = this.dateArray(startDate, endDate);
   
    const occupedDaysBooking = [];
    for (let date of dates) {
      if (this.isOccupied(date) === true) {
        occupedDaysBooking.push(date);
      }else{
        return 0;
      }
     
    }
   //el total de días de ocupación * 100 entre el total de días entre las dos fechas
   const percentageDays = (occupedDaysBooking.lenght/dates.lenght)*100;
   return  percentageDays < 100 ? percentageDays : 100;
 }
}

class Booking {
  constructor({ name, email, checkIn, checkOut, discount, room }) {
    this.name = name;
    this.email = email;
    this.checkIn = checkIn; //date
    this.checkOut = checkOut; //date
    this.discount = discount; //porcentaje
    this.room = room; //objeto {name:"canada", bookings:[booking1, booking2], rate:305, discount:20}
  }
  getFee() {
    //devuelve el precio final (incluidos descuentos de habitación y de la reserva)
    const rate = this.room.rate;
    const discountRoom = rate * (this.room.discount / 100);
    const discountBooking = rate * (this.discount / 100);
    const totalDiscounts = discountBooking + discountRoom;
    const totalRate = rate - discountBooking - discountRoom;
    
    if (totalDiscounts > rate){
      return "The discount is greter than rate"
    }else{
      return totalRate;
    }
  }
}

function totalOccupancyPercentage(rooms, startDate, endDate) {
  //Devuelve el porcentaje de ocupación total de las habitaciones que incluyamos en el array
  let totalOccupancy = 0;
  for (let room of rooms) {
    totalOccupancy +=
      room.occupancyPercentage(startDate, endDate) / rooms.length;
  }
  return Math.round(totalOccupancy);
}

function availableRooms(rooms, startDate, endDate) {
  //devuelve todas las habitaciones del array que NO están ocupadas entre las fechas
  const arrAvailableRooms = []
  rooms.forEach(room => {
    if (room.occupancyPercentage(startDate, endDate) === 0) {
      arrAvailableRooms.push(room)
    }
  })
  return arrAvailableRooms.length > 0 ? arrAvailableRooms : false
}


module.exports = { Room, Booking, totalOccupancyPercentage, availableRooms };
