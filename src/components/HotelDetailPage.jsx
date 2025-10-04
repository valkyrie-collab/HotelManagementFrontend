import { useEffect } from "react";
import { useParams } from "react-router-dom";
import hotelImage from './assets/hotel.webp'

function HotelDetailPage() {
    const {hotelId} = useParams();
    const hotel = {id: 0, name: "hotel0", description: "Kid vs. Kat (stylized KiD vs KaT) is a " +
        "Canadian animated television series that originally aired on YTV in Canada from October 25," + 
        " 2008, until June 4, 2011. The series was created and co-directed by Rob Boutilier, developed" + 
        " and produced at Studio B Productions (a subsidiary of DHX Media, now WildBrain), in " + 
        "ssociation with YTV and Jetix Europe (later rebranded as Disney XD for its second season) 52 episodes were produced."}
    const hotelImages = [hotelImage, hotelImage, hotelImage, hotelImage, hotelImage];
    
    useEffect(
        () => {
            console.log(hotelId);
        },
    [hotelId]);

    return (
        <section
            className="h-screen w-screen bg-[url('./components/assets/HomePageBackground.png')]
                flex flex-row items-center justify-center bg-cover p-5"
        >
            <div
                className="rounded-xl bg-white/15 backdrop-blur-lg border border-white/30
                    shadow-xl p-5 max-w-xl h-3/4 mr-1.5"
            >
                <h1
                    className="text-amber-600 text-center font-bold"
                >
                    {hotel.name}
                </h1>
                <p>
                    description: {hotel.description}
                </p>
            </div>
            <div className="ml-1.5">
                <div
                    className="rounded-xl bg-white/15 backdrop-blur-lg border flex flex-row gap-4
                        border-white/30 shadow-xl p-5 max-w-2xl mb-3 overflow-x-auto whitespace-nowrap
                        scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >   
                    {hotelImages.map((image) => (
                        <img 
                        src={image} 
                        alt="hotelImage" 
                        className="rounded-xl w-3/8 h-3/8"
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