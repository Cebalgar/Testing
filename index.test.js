const {Room, Booking, totalOccupancyPercentage, availableRooms} = require('./index');



const roomTemplate = {
    name: "Toronto",
    rate:305000,
    discount:20,
    bookings:[]
    
  

}
const bookingTemplate1 = {
    name: "Celia",
    email: "celia@celia.es",
    checkIn: new Date(2022, 12, 3),
    checkOut: new Date(2022, 12, 10),
    discount: 20,
    room:{},
}
const bookingTemplate2 = {
    name: "Luis",
    email: "luis@luis.com",
    checkIn: new Date(2022, 12, 1),
    checkOut: new Date(2022, 12, 5),
    discount: 20,
    room:{},

}
    

test("Room is occupied on date", ()=> {
  
    const booking1 = new Booking({ ...bookingTemplate1 })
    const room1 = new Room({ ...roomTemplate, bookings: [booking1]})
    expect(room1.isOccupied(new Date(2022, 12, 4))).toBe(true);
});
test("Room is not occupied on date", ()=>{
    
    const booking1 = new Booking({...bookingTemplate1});
    const room1 = new Room({...roomTemplate, bookings:[booking1]});
    expect(room1.isOccupied(new Date(2022, 12, 15))).toBe(false);
})

test("occupancyPercentage", () => {
    const booking1 = new Booking({...bookingTemplate1});
    const booking2 = new Booking({...bookingTemplate2});
    const room1 = new Room({...roomTemplate, bookings:[booking1, booking2]});
 
    expect(room1.occupancyPercentage(new Date(2022, 12, 11), new Date(2022, 12, 20))).toBe(0);
})

 