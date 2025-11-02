import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ReservationPage() {
    const {roomNumber, hotelName, perNightCost} = useParams()
    const [reservation, setReservation] = useState(
        {
            reservationId: null, userId: null, hotelId: null, roomNumber: roomNumber? atob(roomNumber) : "0",
            typeId: null, checkIn:null,checkOut:null,night:null,occupancy:null,
            perNightCost:perNightCost? parseInt(atob(perNightCost)) : 0,totalAmount:null,status:null,bookedAt:null,
            modifiedAt:null,canceledAt:null,specialRequest:null
        }
    );

    return (
        <section
            className="w-screen h-screen bg-cover bg-[url('./components/assets/background.png')]
                flex items-center justify-center"
        >
            <div
                className="w-[80%] h-[90%] bg-white/15 border border-white/30 backdrop-blur-lg
                    shadow-xl rounded-3xl p-5"
            >
                <h1 className="font-bold text-2xl text-amber-600 pb-5 pl-5 pt-3">Reservation</h1>
                <div className="m-5 flex flex-col gap-1">
                    <h2 className="pl-5 font-bold text-lg text-yellow-400 cursor-default">Hotel Name</h2>
                    <input
                        value={hotelName? hotelName : "HotelName"}
                        readOnly={true}
                        className="p-3 w-[40%] rounded-3xl bg-white/15 border border-white/30 backdrop-blur-lg
                            shadow-xl hover:bg-yellow-400/30 transition-all duration-300 ease-in-out focus:outline-none
                            hover:border-yellow-400 focus:bg-yellow-400/30 focus:border-yellow-400 cursor-default
                            text-black font-bold"
                    />
                </div>
            </div>
        </section>
    );

}

export default ReservationPage;