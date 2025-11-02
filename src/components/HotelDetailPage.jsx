import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import hotelImage from './assets/hotel.webp'

function HotelDetailPage() {
    const {hotelId} = useParams();
    const [hotel, setHotel] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const count = useRef(0);
    // const hotelImages = [hotelImage, hotelImage];
    
    useEffect(
        () => {
            console.log(hotelId);
            const fetchHotelData = async () => {
                const response = await fetch(`http://localhost:8080/catalog/search-hotel-by-id?id=${hotelId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data.imageDTOs);
                    if (count.current === 0) {
                        alert("hotel found successfully");
                        count.current = 1;
                    }
                    setHotel(data);
                } else {
                    console.log("hotel not found")
                    alert("No hotel found");
                    return;
                }

            }

            fetchHotelData();
        },
    [hotelId, token]);

    const handleSaveContact = () => {
        console.log(hotel.contact);

        const doSaveClipboard = async () => {

            try {
                await navigator.clipboard.writeText(hotel.contact);
                alert(`Phone number saved to clipboard: ${hotel.contact}`);
            } catch (err) {
                console.log("not saved to clipboard", err);
            }

        }

        doSaveClipboard();
    }

    const handleRoomNavigation = () => {
        navigate(`/room-service/${hotelId}/${hotel.name}`);
    }

    const scrollRef = useRef(null);

    const handleWheel = (event) => {
        event.preventDefault(); // Prevent vertical scroll
        scrollRef.current.scrollLeft += event.deltaY; // Scroll horizontally by deltaY
    };

    return (
        <section
            className="h-screen w-screen bg-[url('./components/assets/HomePageBackground.png')]
                flex flex-row items-center justify-center bg-cover p-5"
        >  
            <div
                className="rounded-xl bg-white/15 backdrop-blur-lg border border-white/30
                    shadow-xl p-5 max-w-xl h-3/4 mr-1.5 mb-1"
            >
                <h1
                    className="text-amber-600 text-center font-bold"
                >
                    {hotel && hotel.name}
                </h1>
                {/* Item-start will do the text as we write in exam main thing under ther is gap */}
                <div className="flex flex-row items-start gap-2 mt-1 mb-1">
                    <p className="text-xl text-amber-800 font-bold">
                        Description:
                    </p>
                    <p className="pt-1">
                        {hotel && hotel.description} hello world my name is rajarshi 
                        biswas i am testing you to do this in the compouter react application 
                        tot set this good frontend projec t
                    </p>
                </div>
                <div className="flex flex-row items-start gap-2 mt-1 mb-1">
                    <p className="text-amber-800 font-bold text-xl">
                        Address:
                    </p>
                    <p className="pt-1">
                        {hotel && hotel.address}
                    </p>
                </div>
                <div className="flex flex-row items-start gap-2 mt-1 mb-1">
                    <p className="text-amber-800 font-bold text-xl">
                        CheckIn:
                    </p>
                    <p className="text-black font-bold pt-1">
                        {hotel && new Date(hotel.checkIn).toLocaleString()}
                    </p>
                </div>
                <div className="flex flex-row items-start gap-2 mt-1 mb-1">
                    <p className="text-amber-800 font-bold text-xl">
                        CheckOut:
                    </p>
                    <p className="text-black font-bold pt-1">
                        {hotel && new Date(hotel.checkOut).toLocaleString()}
                    </p>
                </div>
            </div>
            <div className="ml-1.5">
                <div
                    ref={scrollRef}
                    onWheel={handleWheel}
                    className="rounded-xl bg-white/15 backdrop-blur-lg border flex flex-row gap-4
                        border-white/30 shadow-xl p-5 max-w-2xl mb-3 overflow-x-auto whitespace-nowrap
                        scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >   
                    {hotel && hotel.imageDTOs && hotel.imageDTOs.map((image, index) => (
                        <img
                            key={index} 
                            src={`data:${image.type};base64,${image.data}`} 
                            alt={image.name}
                            className="rounded-xl w-[34%] h-[50%] object-cover"
                    />
                    )
                )}
                </div>
                <div
                    className="rounded-xl bg-white/15 backdrop-blur-lg border
                        border-white/30 shadow-xl p-5 max-w-2xl mt-3"
                >
                    <div
                        className="flex flex-row justify-center gap-10"
                    >
                        <a
                            className="rounded-2xl bg-amber-600/15 backdrop-blur-lg border
                                border-amber-700/30 shadow-xl p-2 cursor-pointer hover:bg-amber-600/30
                                transition duration-300 ease-in-out"
                        >
                            <span className="ml-2 mr-2 text-amber-600 font-bold">
                                reserve
                            </span>
                        </a>

                        <a
                            onClick={handleRoomNavigation}
                            className="rounded-2xl bg-green-500/15 backdrop-blur-lg border
                                border-green-600/30 shadow-xl p-2 cursor-pointer hover:bg-green-500/30
                                transition duration-300 ease-in-out "
                        >
                            <span className="ml-2 mr-2 text-green-600 font-bold">
                                show-room
                            </span>
                        </a>

                        <a  
                            onClick={handleSaveContact}
                            className="rounded-2xl bg-green-500/15 backdrop-blur-lg border
                                border-green-600/30 shadow-xl p-2 cursor-pointer hover:bg-green-500/30
                                transition duration-300 ease-in-out "
                        >
                            <span className="ml-2 mr-2 text-green-600 font-bold">
                                contact-us
                            </span>
                        </a>

                        <a
                            className="rounded-2xl bg-red-500/15 backdrop-blur-lg border
                                border-red-600/30 shadow-xl p-2 cursor-pointer hover:bg-red-500/30
                                transition duration-300 ease-in-out"
                        >
                            <span className="ml-2 mr-2 text-red-500 font-bold">
                                cancel
                            </span>
                        </a>

                    </div>
                </div>
                <div
                    className="rounded-xl bg-white/15 backdrop-blur-lg border
                        border-white/30 shadow-xl p-5 max-w-2xl mt-3"
                >
                    <p className="text-black">
                        Agreement To Terms: These Terms and Conditions constitute a 
                        legally binding agreement between you User and governing your 
                        access and use of . By using the Site, you agree to be bound 
                        by these terms. If you do not agree, do not access or use 
                        the Site.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default HotelDetailPage;