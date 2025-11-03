import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ReservationPage() {
    const {roomNumber, hotelName, perNightCost, doingReservation, roomId, hotelId} = useParams();
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [showPopUp, setShowPopUp] = useState(false);
    const [whichPopUp, setWhichShowPopUp] = useState(-1);
    const [reservation, setReservation] = useState(
        {
            reservationId: null, userId: username, hotelId: hotelId? atob(hotelId) : "hotelId", roomNumber: roomNumber? atob(roomNumber) : "0",
            typeId: roomId? atob(roomId) : "000", checkIn:null,checkOut:null,night:0,occupancy:[], hotelName: hotelName? atob(hotelName) : "hotelName",
            perNightCost:perNightCost? parseInt(atob(perNightCost)) : 0,totalAmount:null,status:null,
            bookedAt:null,modifiedAt:null,canceledAt:null,specialRequest:null
        }
    );
    const [selected, setSelected] = useState([]);
    const [reservationId, setReservationId] = useState("");
    
    const handleTogglingRadioButton = (value) => {
        console.log(selected);
        if (selected.includes(value)) {
            // Remove the value (toggle off)
            setSelected(selected.filter(item => item !== value));
        } else {
            // Add the value (toggle on)
            setSelected([...selected, value]);
        }
    };

    const handleReservationChange = (event) => {
        const {name, value} = event.target;
        setReservation(rev => ({...rev, [name]: value}));
    }

    // const reserveReference = useRef();

    // const handleReserveReference = () => {
        
    //     if (reserveReference.current) {

    //     }

    // }

    const handleReservation = () => {
        console.log(reservation);
        
        if (token !== null) {

            const submitReservationData = async () => {
                const response = await fetch(`http://localhost:8080/reservation/add-reservation?token=${token}&${btoa(JSON.stringify(reservation))}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.text();
                    console.log(data);
                    alert(data);
                } else {
                    alert("server error");
                }
            }

            submitReservationData();
        } else {
            alert("Token missing....");
        }

    };

    const handleVariousReservationFunction = (event) => {
        event.preventDefault();
        console.log("working");

        if (reservationId !== null) {

            if (whichPopUp === 0) {
                console.log("working one");
                const submitCancellation = async () => {
                    const response = await fetch (`http://localhost:8080/reservation/cancel-reservation?reservationId=${reservationId}`, {
                        method:"POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.text();
                        console.log(data);
                        alert(data);
                        setShowPopUp(false);
                    } else {
                        alert("server error");
                    }

                } 

                submitCancellation();
            } else if (whichPopUp === 1) {
                console.log("working two");
                const submitCheckIn = async () => {
                    const response = await fetch (`http://localhost:8080/reservation/update-check-in?reservationId=${reservationId}`, {
                        method:"POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.text();
                        console.log(data);
                        alert(data);
                        setShowPopUp(false);
                    } else {
                        alert("server error");
                    }

                } 

                submitCheckIn();
            } else if (whichPopUp === 2) {
                console.log("working three");
                const submitCheckOut = async () => {
                    const response = await fetch (`http://localhost:8080/reservation/update-check-out?reservationId=${reservationId}`, {
                        method:"POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.text();
                        console.log(data);
                        alert(data);
                        setShowPopUp(false);
                    } else {
                        alert("server error");
                    }

                } 

                submitCheckOut();
            } else {
                alert("Enter the valid input....");
            }
        } else {
            alert("reservation Id is missing....");
        }

    }

    const useReference = useRef();

    const handleSubmitOfReservation = () => {

        if (useReference.current) {
            useReference.current.requestSubmit();
        }

    }

    // const handleOccupancy = (event) => {
    //     const {name, value} = event.target;
        
    //     if (reservation.occupancy[0] == null && value === "child") {
    //         setReservation(res => ({...res, [name]: value}));
    //     } else if (reservation.occupancy[0] != null) {
            
    //     }

    // }

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
                <div className="w-[100%] h-[100%] flex flex-row gap-5">
                    <div className="w-[40%] h-[100%]">
                        <div className="m-5 flex flex-col gap-1">
                            <h2 className="pl-5 font-bold text-lg text-yellow-400 cursor-default">Username</h2>
                            <input
                                value={username? username : "Username"}
                                readOnly={true}
                                className="pl-5 pt-3 pr-3 pb-3 w-[100%] rounded-3xl bg-white/15 border border-white/30 backdrop-blur-lg
                                    shadow-xl hover:bg-yellow-400/30 transition-all duration-300 ease-in-out focus:outline-none
                                    hover:border-yellow-400 focus:bg-yellow-400/30 focus:border-yellow-400 cursor-default
                                    text-black font-bold"
                            />
                        </div>
                        <div className="m-5 flex flex-col gap-1">
                            <h2 className="pl-5 font-bold text-lg text-yellow-400 cursor-default">Hotel Name</h2>
                            <input
                                value={hotelName? hotelName : "Hotel Name"}
                                readOnly={true}
                                className="pl-5 pt-3 pr-3 pb-3 w-[100%] rounded-3xl bg-white/15 border border-white/30 backdrop-blur-lg
                                    shadow-xl hover:bg-yellow-400/30 transition-all duration-300 ease-in-out focus:outline-none
                                    hover:border-yellow-400 focus:bg-yellow-400/30 focus:border-yellow-400 cursor-default
                                    text-black font-bold"
                            />
                        </div>
                        <div className="m-5 flex flex-col gap-1">
                            <h2 className="pl-5 font-bold text-lg text-yellow-400 cursor-default">Room Number</h2>
                            <input
                                value={roomNumber? roomNumber : "Room Number"}
                                readOnly={true}
                                className="pl-5 pt-3 pr-3 pb-3 w-[100%] rounded-3xl bg-white/15 border border-white/30 backdrop-blur-lg
                                    shadow-xl hover:bg-yellow-400/30 transition-all duration-300 ease-in-out focus:outline-none
                                    hover:border-yellow-400 focus:bg-yellow-400/30 focus:border-yellow-400 cursor-default
                                    text-black font-bold"
                            />
                        </div>
                        <div className="m-5 flex flex-col gap-1 w-[95%] h-[100%]">
                            <div className=" flex flex-col gap-1 rounded-3xl bg-white/15 border border-white/30 backdrop-blur-lg
                                shadow-xl w-[100%] h-[35%] justify-center p-5"
                            >
                                <label
                                    className="font-bold text-xl text-amber-600 m-5"
                                >
                                    <input 
                                        type="checkbox"
                                        name="occupancy"
                                        value="child"
                                        checked={selected.includes("child")}
                                        onChange={() => handleTogglingRadioButton("child")}
                                        className="ml-3 mr-3"
                                    />
                                        Included Children
                                </label>
                                <label
                                    className="font-bold text-xl text-amber-600 m-5"
                                >
                                    <input 
                                        type="checkbox" 
                                        name="occupancy"
                                        value="adult"
                                        checked={selected.includes("adult")}
                                        onChange={() => handleTogglingRadioButton("adult")}
                                        className="ml-3 mr-3"
                                    />
                                        Included Adult
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="w-[40%] h-[100%]">
                        <div className="m-5 flex flex-col gap-1">
                            <h2 className="pl-5 font-bold text-lg text-yellow-400 cursor-default">Room Number</h2>
                            <input
                                value={roomNumber? roomNumber : "000"}
                                readOnly={true}
                                className="pl-5 pt-3 pr-3 pb-3 w-[100%] rounded-3xl bg-white/15 border border-white/30 backdrop-blur-lg
                                    shadow-xl hover:bg-yellow-400/30 transition-all duration-300 ease-in-out focus:outline-none
                                    hover:border-yellow-400 focus:bg-yellow-400/30 focus:border-yellow-400 cursor-default
                                    text-black font-bold"
                            />
                        </div>
                        <div className="m-5 flex flex-col gap-1">
                            <h2 className="pl-5 font-bold text-lg text-yellow-400 cursor-default">Per Night</h2>
                            <input
                                value={reservation.perNightCost}
                                readOnly={true}
                                className="pl-5 pt-3 pr-3 pb-3 w-[100%] rounded-3xl bg-white/15 border border-white/30 backdrop-blur-lg
                                    shadow-xl hover:bg-yellow-400/30 transition-all duration-300 ease-in-out focus:outline-none
                                    hover:border-yellow-400 focus:bg-yellow-400/30 focus:border-yellow-400 cursor-default
                                    text-black font-bold"
                            />
                        </div>
                        <div className="m-5 flex flex-col gap-1">
                            <h2 className="pl-5 font-bold text-lg text-yellow-400 cursor-default">Number Of Nights</h2>
                            <input
                                type="number"
                                name="night"
                                value={reservation.night}
                                readOnly={doingReservation? false : doingReservation}
                                onChange={handleReservationChange}
                                className="pl-5 pt-3 pr-3 pb-3 w-[100%] rounded-3xl bg-white/15 border border-white/30 backdrop-blur-lg
                                    shadow-xl hover:bg-yellow-400/30 transition-all duration-300 ease-in-out focus:outline-none
                                    hover:border-yellow-400 focus:bg-yellow-400/30 focus:border-yellow-400
                                    text-black font-bold"
                            />
                        </div>
                        <div className="m-5 flex flex-col gap-1">
                            <h2 className="pl-5 font-bold text-lg text-yellow-400 cursor-default">Total Amount</h2>
                            <input
                                type="number"
                                name="totalAmount"
                                value={reservation.night * reservation.perNightCost}
                                onChange={handleReservationChange}
                                readOnly={true}
                                className="pl-5 pt-3 pr-3 pb-3 w-[100%] rounded-3xl bg-white/15 border border-white/30 backdrop-blur-lg
                                    shadow-xl hover:bg-yellow-400/30 transition-all duration-300 ease-in-out focus:outline-none
                                    hover:border-yellow-400 focus:bg-yellow-400/30 focus:border-yellow-400 cursor-default
                                    text-black font-bold"
                            />
                        </div>
                        <div className="m-5 flex flex-col gap-1">
                            <h2 className="pl-5 font-bold text-lg text-yellow-400 cursor-default">Special Request</h2>
                            <textarea
                                id="specialRequest"
                                type="number"
                                name="specialRequest"
                                placeholder="Enter your special request if any....."
                                value={reservation.specialRequest? reservation.specialRequest : "write something"}
                                rows={3}
                                onChange={handleReservationChange}
                                readOnly={doingReservation? false : doingReservation}
                                className="pl-5 pt-3 pr-3 pb-3 w-[100%] rounded-3xl bg-white/15 border border-white/30 backdrop-blur-lg
                                    shadow-xl hover:bg-yellow-400/30 transition-all duration-300 ease-in-out focus:outline-none
                                    hover:border-yellow-400 focus:bg-yellow-400/30 focus:border-yellow-400 cursor-default
                                    text-black font-bold"
                            />
                        </div>
                    </div>
                    <div className="w-[15%] h-[100%]" >
                        <div className="w-[100%] h-[100%] m-5 flex flex-col gap-1">
                            {doingReservation && (
                                <div>
                                    <a
                                        onClick={handleReservation}
                                        className="mt-7 rounded-3xl bg-green-500/25 backdrop-blur-lg border border-green-500/60
                                            shadow-xl hover:bg-green-600/30 cursor-pointer p-2 flex justify-center
                                            transition-all duration-300 ease-in-out"
                                    >
                                        <span className="text-lg font-bold text-green-700">Reserve</span>
                                    </a>
                                    <a
                                        onClick={() => {navigate(-1)}}
                                        className="mt-7 rounded-3xl bg-red-500/25 backdrop-blur-lg border border-red-500/60
                                            shadow-xl hover:bg-red-600/30 cursor-pointer p-2 flex justify-center
                                            transition-all duration-300 ease-in-out"
                                    >
                                        <span className="text-lg font-bold text-red-700">Back</span>
                                    </a>
                                </div>
                            )}
                            {(!doingReservation) && (
                                <div>
                                    {}
                                    <a
                                        onClick={() => {setShowPopUp(true), setWhichShowPopUp(0)}}
                                        className="mt-7 rounded-3xl bg-red-500/25 backdrop-blur-lg border border-red-500/60
                                            shadow-xl hover:bg-red-600/30 cursor-pointer p-2 flex justify-center
                                            transition-all duration-300 ease-in-out"
                                    >
                                        <span className="text-lg font-bold text-red-700">Cancel</span>
                                    </a>
                                    <a
                                        onClick={() => {setShowPopUp(true); setWhichShowPopUp(1)}}
                                        className="mt-7 rounded-3xl bg-green-500/25 backdrop-blur-lg border border-green-500/60
                                            shadow-xl hover:bg-green-600/30 cursor-pointer p-2 flex justify-center
                                            transition-all duration-300 ease-in-out"
                                    >
                                        <span className="text-lg font-bold text-green-700">Check-In</span>
                                    </a>
                                    <a
                                        onClick={() => {setShowPopUp(true); setWhichShowPopUp(2)}}
                                        className="mt-7 rounded-3xl bg-green-500/25 backdrop-blur-lg border border-green-500/60
                                            shadow-xl hover:bg-green-600/30 cursor-pointer p-2 flex justify-center
                                            transition-all duration-300 ease-in-out"
                                    >
                                        <span className="text-lg font-bold text-green-700">Check-Out</span>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {showPopUp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/15 border border-white/30
                    backdrop-blur-lg shadow-xl"
                >
                    <div className="bg-white/15 border border-white/30 rounded-2xl p-10
                        backdrop-blur-lg shadow-xl flex flex-col items-center justify-center w-[40%] h-[50%]"
                    >
                        <form ref={useReference} onSubmit={handleVariousReservationFunction} className="w-full">
                            <label className="pl-5 font-bold text-lg text-amber-600 cursor-default pr-5">
                                Reservation ID:
                            </label>
                            <input
                                type="text"
                                name="reservationId"
                                value={reservationId}
                                onChange={(event) => {setReservationId(event.target.value);}}
                                className="pl-5 pt-3 pr-3 pb-3 w-[50%] rounded-3xl bg-white/15 border border-white/30 backdrop-blur-lg
                                    shadow-xl hover:bg-yellow-400/30 transition-all duration-300 ease-in-out focus:outline-none
                                    hover:border-yellow-400 focus:bg-yellow-400/30 focus:border-yellow-400 cursor-default
                                    text-black font-bold"
                                placeholder="Type here..."
                            />
                            <div className="flex gap-5 items-center justify-center">
                                <a
                                onClick={handleSubmitOfReservation}
                                className="mt-7 rounded-3xl bg-green-500/25 backdrop-blur-lg border border-green-500/60
                                    shadow-xl hover:bg-green-600/30 cursor-pointer pt-2 pb-2 pl-5 pr-5 flex justify-center
                                    transition-all duration-300 ease-in-out"
                                >
                                <span className="text-lg font-bold text-green-700">Submit</span>
                                </a>
                                <a
                                type="button"
                                onClick={() => {setShowPopUp(false)}}
                                className="mt-7 rounded-3xl bg-red-500/25 backdrop-blur-lg border border-red-500/60
                                    shadow-xl hover:bg-red-600/30 cursor-pointer pt-2 pb-2 pl-5 pr-5 flex justify-center
                                    transition-all duration-300 ease-in-out"
                                >
                                <span className="text-lg font-bold text-red-700">Close</span>
                                </a>
                            </div>
                            </form>
                    </div>
                </div>
            )}

        </section>
    );

}

export default ReservationPage;