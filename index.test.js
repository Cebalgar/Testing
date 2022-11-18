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
    checkIn: new Date(2022, 12, 20),
    checkOut: new Date(2022, 12, 27),
    discount: 20,
    room:{},

}
const bookingTemplate3={
    name: "Ana",
    email: "ana@ana.com",
    checkIn: new Date(2022, 11, 23),
    checkOut: new Date(2022, 11, 30),
    discount: 10,
    room:{}, 
}
const bookingTemplate4={
    name: "Pedro",
    email: "pedro@pedro.com",
    checkIn: new Date(2022, 11, 4),
    checkOut: new Date(2022, 11, 6),
    discount: 30,
    room:{}, 
}
describe('Prueba - isOccupied', () => {

        test("Room is occupied on date", () => {
        
            const booking1 = new Booking({ ...bookingTemplate1 })
            const room1 = new Room({ ...roomTemplate, bookings: [booking1]})
            expect(room1.isOccupied(new Date(2022, 12, 4))).toBe(true);
        });
        test("Room is not occupied on date", () => {
            
            const booking1 = new Booking({...bookingTemplate1});
            const room1 = new Room({...roomTemplate, bookings:[booking1]});
            expect(room1.isOccupied(new Date(2022, 12, 15))).toBe(false);
        })
        test("Two bookings, the room is not occupied on date", () => {
          
            const booking1 = new Booking({...bookingTemplate1});
            const booking2 = new Booking({...bookingTemplate2});
            const room1 = new Room({...roomTemplate, bookings:[booking1,booking2]});
            expect (room1.isOccupied(new Date(2022, 12, 23))).toBe(false);
           
        })
        test("Two bookings, the room is occupied on date", () => {
          
            const booking1 = new Booking({...bookingTemplate1});
            const booking2 = new Booking({...bookingTemplate2});
            const room1 = new Room({...roomTemplate, bookings:[booking1,booking2]});
            expect (room1.isOccupied(new Date(2022, 12, 8))).toBe(true);
           
        })
})


 describe('Prueba - occupancyPercentage', () => {
        test("occupancyPercentage es 0", () => {
            const booking1 = new Booking({...bookingTemplate1});
            const room1 = new Room({...roomTemplate, bookings:[booking1]});
        
            expect(room1.occupancyPercentage(new Date(2022, 12, 11), new Date(2022, 12, 15))).toBe(0);
        })
        test("occupancyPercentage es 100%", () => {
            const booking2 = new Booking({...bookingTemplate2});
            const room1 = new Room({...roomTemplate, bookings:[booking2]});
        
            expect(room1.occupancyPercentage(new Date(2022, 12, 20), new Date(2022, 12, 24))).toBe(100);
        })
      test("occupancyPercentage es 50%", () => {
        const booking4 = new Booking({...bookingTemplate4});
        const room1 = new Room({...roomTemplate, bookings:[booking4]});
    
        expect(room1.occupancyPercentage(new Date(2022, 11, 3), new Date(2022, 11, 6))).toBe(50);
        })
      

 })

describe('Prueba - getFee', () => {
        test("totalFee", () => {
            const room1 = new Room({...roomTemplate})
            const booking1 = new Booking({...bookingTemplate1, room: room1 });
            room1.bookings=[booking1]
            expect(booking1.getFee()).toBe(183000);
        })
        test("totalFee = 0", () => {
            const room1 = new Room({...roomTemplate, discount:40});
            const booking1 = new Booking({...bookingTemplate1, discount:60, room: room1 })
            room1.bookings = [booking1];
            expect(booking1.getFee()).toBe(0)
        })
        test("totalFee - The discount is greter than rate", () => {
            const room1 = new Room({...roomTemplate, discount:40});
            const booking1 = new Booking({...bookingTemplate1, discount:70, room: room1 })
            room1.bookings = [booking1];
            expect(booking1.getFee()).toEqual('The discount is greter than rate')
        })
        test("totalFee is 50%", () => {
            const room1 = new Room({...roomTemplate});
            const booking4 = new Booking({...bookingTemplate4, room: room1});
            expect(booking4.getFee()).toBe(152500);
        })
})

describe('Prueba - totalOccupancyPercentage', () => {

       test('Total Occupancy Percentage 33%', () => {
        const booking1 = new Booking({ ...bookingTemplate1, checkin: new Date(2022, 12, 3), checkout: new Date(2022, 12, 14) });
        const booking2 = new Booking({ ...bookingTemplate2, checkin: new Date(2022, 12, 12), checkout: new Date(2022, 12, 14)});
        const booking3 = new Booking({ ...bookingTemplate3, checkin: new Date(2022, 12, 8), checkout: new Date(2022, 12, 14) });
        const room1 = new Room({ ...roomTemplate, bookings: [booking1] });
        const room2 = new Room({ ...roomTemplate, bookings: [booking2] });
        const room3 = new Room({ ...roomTemplate, bookings: [booking3] });
            const startDate = new Date(2022, 12 , 3);
            const endDate = new Date(2022, 12, 7);
        expect(totalOccupancyPercentage([room1, room2, room3], startDate, endDate)).toBe(33);
       })
       
       test('Total Occupancy Percentage 50%', () => {
        const booking1 = new Booking({ ...bookingTemplate1 });
        const booking2 = new Booking({ ...bookingTemplate2, checkin: new Date(2022, 12, 7), checkout: new Date(2022, 12, 15)});
        const room1 = new Room({ ...roomTemplate, bookings: [booking1] });
        const room2 = new Room({ ...roomTemplate, bookings: [booking2] });
            const startDate = new Date(2022, 12, 8);
            const endDate = new Date(2022, 12, 9);
        expect(totalOccupancyPercentage([room1, room2], startDate, endDate)).toBe(50);
   })
 })

describe('Prueba - availableRooms', () => {
    test('Available Rooms ', () => {
            const booking1 = new Booking({ ...bookingTemplate1, checkin: new Date(2022, 12, 3), checkout: new Date(2022, 12, 14) });
            const booking2 = new Booking({ ...bookingTemplate2, checkin: new Date(2022, 12, 12), checkout: new Date(2022, 12, 14)});
            const booking3 = new Booking({ ...bookingTemplate3, checkin: new Date(2022, 12, 8), checkout: new Date(2022, 12, 14) });
            const room1 = new Room({ ...roomTemplate, bookings: [booking1] });
            const room2 = new Room({ ...roomTemplate, bookings: [booking2] });
            const room3 = new Room({ ...roomTemplate, bookings: [booking3] });
                const startDate = new Date(2022, 12 , 4);
                const endDate = new Date(2022, 12, 7);
                expect(availableRooms([room1, room2, room3], startDate, endDate)).toStrictEqual([room2,room3]);
    })
               
        
})

