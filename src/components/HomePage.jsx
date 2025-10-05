import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import search from "./assets/search.svg"

function HomePage() {
    const [hotels, setHotels] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [decode, setDecode] = useState(null);
    const [isExpired, setIsExpired] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleSearchHotel = (event) => {
        setHotels([]);
        const value = btoa(event.target.value);
        console.log(value);

        const fetchHotelList = async () => {
            const response = await fetch(`http://localhost:8080/catalog/search-hotels?name=${value}`,
                {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setHotels(data);
            } else {
                return;
            }

        }

        fetchHotelList();
    }

    const handleSignPageOrUserProfile = (event) => {

        if (event === "sign") {
            navigate("/sign-page")
        } else {
            navigate(`/user-profile`)
        }

    }

    const handleAdminNavigation = () => {
        navigate("/admin-page");
    }

    useEffect(
        () => {
            // localStorage.clear();
            console.log("the token is: ",token);
            if (token !== null) {
                const data = jwtDecode(token)
                setDecode(data);
                console.log("the decoded token is", data);

                if (new Date() >= new Date(data.exp)) {
                    localStorage.clear();
                    setIsExpired(true);
                }

                if (data.roles[0] === "ROLE_ADMIN") {
                    setIsAdmin(true);
                }

            }
            const fetchHotels = async () => {

                const response = await fetch(`http://localhost:8080/catalog/get-hotels`, 
                    {
                        method: "GET",
                        headers: {"Content-Type": "application/json"}
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    console.log("hotels found", data);
                    setHotels(data);
                } else {
                    console.log("no hotels found")
                }

            }

            fetchHotels();
        },
    [token]);

    const handleHotelDetails = (hotelId) => {
        // console.log("navigating to the hotel show page");
        navigate(`/hotel-details/${btoa(hotelId)}`)
    }

    return (
        <section 
        className="bg-amber-300 h-screen w-screen
            bg-[url('./components/assets/HomePageBackground.png')] bg-cover"
        >
            <header 
                className=" sticky h-20 bg-amber-600/15 backdrop-blur-lg border border-amber-500/30 shadow-xl 
                    flex flex-row justify-between pl-5 pr-5">
                <h1 
                    className=" text-amber-600 font-bold">Hotel Management</h1>
                <div className="flex flex-row items-center">
                    <input
                        name="search"
                        placeholder="Search"
                        onChange={handleSearchHotel}
                        className=" p-2 text-amber-50 border border-amber-800/50 placeholder:text-amber-800 h-10
                            focus:outline-none focus:ring-1 focus:ring-amber-600 rounded-tl-xl rounded-bl-xl backdrop-blur-lg"
                    />
                    <a>
                        <img 
                            src={search}
                            alt="search" 
                            className=" h-10 w-10 p-2 border border-amber-800/50 placeholder:text-amber-800 cursor-pointer
                                focus:outline-none focus:ring-1 focus:ring-amber-600 rounded-tr-xl rounded-br-xl backdrop-blur-lg"
                        />
                    </a>
                        {token !== null && !isExpired && decode ? (
                        <a
                            onClick={() => handleSignPageOrUserProfile("profile")}
                        >
                            <span
                                className="ml-5 h-10 w-10 pl-3 pt-2 pb-2 pr-3 border border-amber-600 rounded-2xl text-amber-700 
                                    bg-amber-700/15 backdrop-blur-lg cursor-pointer"
                            >
                            {decode.sub.charAt(0)}
                            </span>
                        </a>
                        ) : (
                        <a
                            onClick={() => handleSignPageOrUserProfile("sign")}
                        >
                            <span
                                className="ml-5 h-10 w-10 p-2 border border-amber-600 rounded-xl text-amber-700 
                                    bg-amber-700/15 backdrop-blur-lg cursor-pointer"
                            >
                                Sign-In/Sign-Up
                            </span>
                        </a>
                        )}
                    {token !== null && isAdmin && (
                        <a
                            onClick={handleAdminNavigation}
                        >
                            <div 
                                className="rounded-3xl bg-red-500/15 backdrop-blur-lg border border-red-500/30 shadow-2xl
                                    focus:outline-none focus:ring-1 focus:ring-red-600/50 hover:bg-red-500/25 p-2 ml-5 cursor-pointer"
                            >
                                <span
                                    className="text-red-600 font-bold text-xl"
                                >
                                    Admin
                                </span>
                            </div>
                        </a>
                    )}
                </div>
            </header>
            <main
                className="p-5"
            >
                {
                    hotels.length > 0? (
                        <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3 p-4
                            max-h-[490px] overflow-y-auto">
                            {
                                hotels.map((hotel, index) => (
                                    <div 
                                        key={index}
                                        className="flex flex-col items-center justify-center p-3 rounded-xl bg-amber-50/15 
                                            backdrop-blur-lg border border-white/30 shadow-xl"
                                    >
                                        <h2
                                            className="text-amber-500 font-bold text-2xl"
                                        >
                                            {hotel.name}
                                        </h2>
                                        <p>
                                            Disclaimer: {hotel.description}
                                        </p>
                                        <div
                                            className="flex flex-row items-center justify-center"
                                        >   
                                            <div className="flex flex-col gap-2 pr-1.5">
                                                <p>
                                                    check-in
                                                </p>
                                                <p>
                                                    {new Date(hotel.checkIn).toLocaleString()}
                                                </p>
                                            </div>
                                            
                                            <div className="flex flex-col gap-2 pl-1.5">
                                                <p>
                                                    check-out
                                                </p>
                                                <p>
                                                    {new Date(hotel.checkOut).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                        <a
                                            onClick={() => handleHotelDetails(hotel.id)}
                                        >
                                            <div
                                                className="pl-5 pt-1 pb-1 pr-5 flex justify-center bg-amber-700/15 backdrop-blur-lg
                                                    border border-amber-700/30 shadow-xl rounded-xl hover:bg-amber-800/25
                                                    transition ease-in-out duration-300 cursor-pointer"
                                            >
                                                <span className="text-amber-600 font-bold">Select</span>
                                            </div>
                                        </a>
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <h1> No Hotel found </h1>
                    )
                }
            </main>
        </section>
    );
}

export default HomePage;