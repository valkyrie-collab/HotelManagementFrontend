import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactSVG from "./assets/react.svg"
function RoomPage() {
    // const roomNumbers = [
    //     1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    //     21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
    //     39, 40
    // ];
    // const imageList = [
    //     {id: 1, image: ReactSVG}, {id: 2, image: ReactSVG}, 
    //     {id: 3, image: ReactSVG}, {id: 4, image: ReactSVG}, 
    //     {id: 5, image: ReactSVG}, {id: 6, image: ReactSVG}, 
    //     {id: 7, image: ReactSVG}, {id: 8, image: ReactSVG}, 
    //     {id: 9, image: ReactSVG}, {id: 10, image: ReactSVG}
    // ];
    const navigate = useNavigate();

    const {hotelId, hotelName} = useParams()
    // const [token, setToken] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [whichRoomIndex, setWhichRoomIndex] = useState(0);

    useEffect(() => {
        console.log(hotelId);
        const localToken = localStorage.getItem("token");

        if (localToken !== null) {
            // setToken(localToken);
            const fetchRoomData = async () => {

                try {
                    const response = await fetch(`http://localhost:8080/catalog/get-rooms?hotelId=${hotelId}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localToken}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        setRooms(data);
                    } else {
                        alert("No room found");
                    }

                } catch (e) {
                    alert("Server error while fetching ", e)
                }
            }
            fetchRoomData();
        }

    }, [hotelId])

    const handleShowRoomDetails = (index) => {
        // console.log(index);
        setWhichRoomIndex(index)
    }

    const handleReserveRoom = (index) => {
        navigate(`/reservation-path/${btoa(rooms[index].roomNumber.toString())}/${btoa(hotelName)}/${btoa(rooms[index].price.toString())}/${true}/${btoa(rooms[index].id)}/${hotelId}`)
    }   

    return(
        <section
            className="flex items-center justify-center h-screen w-screen 
                bg-[url('./components/assets/background.png')] bg-cover"
        >
            <div
                className="w-[80%] h-[80%] flex flex-row gap-3 items-center"
            >
                <div
                    className="w-[30%] h-[100%] p-3 rounded-2xl bg-white/15 border border-white/30 backdrop-blur-lg
                        shadow-xl"
                >
                    <div
                        className="w-[100%] h-[100%] overflow-y-auto [&::-webkit-scrollbar]:hidden"
                    >
                        <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
                            {rooms && rooms.map((room, index) => {
                                return (
                                <div
                                    onClick={() => handleShowRoomDetails(index)}
                                    key={index}
                                    className="p-3 rounded-3xl bg-white/15 border border-white/30 backdrop-blur-lg
                                        shadow-xl flex justify-center hover:bg-amber-600/15 hover:border-amber-600/30
                                        transition-all duration-300 ease-in-out cursor-default"
                                >
                                    <span className="text-xl font-bold text-amber-600">{room.roomNumber}</span>
                                </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div
                    className="w-[70%] h-[100%] flex flex-col gap-3"
                >
                    <div
                        className=" w-[100%] h-[85%] p-3 rounded-2xl bg-white/15 border border-white/30 backdrop-blur-lg
                            shadow-xl"
                    >
                        <div
                            className="w-[100%] h-[100%] overflow-y-auto [&::-webkit-scrollbar]:hidden"
                        >
                            <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3 items-center">
                                {
                                    rooms.length > 0 && rooms[whichRoomIndex].imageDTOs.map((image) => {
                                        return (
                                            <div
                                                key={image.id}
                                            >
                                                <img 
                                                    src={image.data !== null? `data:${image.type};base64,${image.data}` : ReactSVG} 
                                                    alt="image" 
                                                    className="w-[50%] h-[90%] p-2 rounded-2xl object-cover"
                                                />
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div
                        className=" w-[100%] h-[15%] p-3 rounded-2xl bg-white/15 border border-white/30 backdrop-blur-lg
                            shadow-xl flex flex-row items-center justify-center gap-20"
                    >
                        <a
                            onClick={() =>handleReserveRoom(whichRoomIndex)}
                            className="rounded-3xl bg-green-500/15 backdrop-blur-lg border border-green-500/30
                                shadow-xl hover:bg-green-600/25 cursor-pointer p-2 flex justify-center
                                transition-all duration-300 ease-in-out"
                            >
                                <span  className="text-lg font-bold text-green-700 pl-2 pr-2">Reserve</span>
                        </a>
                        <a
                            onClick={() => {navigate("/")}}
                            className="rounded-3xl bg-yellow-500/15 backdrop-blur-lg border border-yellow-500/30
                                shadow-xl hover:bg-yellow-600/25 cursor-pointer p-2 flex justify-center
                                transition-all duration-300 ease-in-out"
                            >
                                <span  className="text-lg font-bold text-yellow-700 pl-2 pr-2">Home</span>
                        </a>
                        <a
                            onClick={() => {navigate(`/hotel-details/${hotelId}`)}}
                            className="rounded-3xl bg-red-500/15 backdrop-blur-lg border border-red-500/30
                                shadow-xl hover:bg-red-600/25 cursor-pointer p-2 flex justify-center
                                transition-all duration-300 ease-in-out"
                            >
                                <span  className="text-lg font-bold text-red-700 pl-2 pr-2">Back</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RoomPage;