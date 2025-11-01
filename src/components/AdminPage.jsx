import { useRef, useState } from "react";

function AdminPage() {
    const [isAddHotelVisible, setIsAddHotelVisible] = useState(false);
    const [isAddHotelActive, setIsAddHotelActive] = useState(false);
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
    const [isAddRoomActive, setIsAddRoomActive] = useState(false);
    const [isRemoveHotelVisible, setIsRemoveHotelVisible] = useState(false);
    const [isRemoveRoomVisible, setIsRemoveRoomVisible] = useState(false);
    const [isRemoveAllRoomVisible, setIsRemoveAllRoomVisible] = useState(false);
    const [isRemoveHotelRoomVisible, setIsRemoveHotelRoomVisible] = useState(false);
    const [roomData, setRoomData] = useState({
        roomNumber: "", description: "", childrenNumber: "",
        beds: "", name: "", adultNumber: "", price: "", hotelId: ""
    });
    const [hotelData, setHotelData] = useState({
        name: "", brand: "", description: "", address: "",
        contact: ""
    });
    const [roomImages, setRoomImages] = useState([]);
    const [hotelImages, setHotelImages] = useState([]);
    const [removeData, setRemoveData] = useState(
        {hotelId: "", roomNumber: ""}
    );
    const doReference = useRef(null);
    const doRoomReference = useRef(null);
    const token = localStorage.getItem("token");
    const doRemoveRoomReference = useRef(null);
    const doRemoveHotelReference = useRef(null);
    const doRemoveAllRoomReference = useRef(null);

    const handleAddHotel = () => {

        if (!isAddHotelVisible) {
        setIsAddHotelActive(true);
        setTimeout(() => setIsAddHotelVisible(true), 50);
        } else {
        setIsAddHotelVisible(false);
        setTimeout(() => setIsAddHotelActive(false), 300); // Match Tailwind duration
        }

    };

    const handleAddRooms = () => {
        
        if (isAddRoomVisible) {
            setIsAddRoomVisible(false);
            setTimeout(() => setIsAddRoomActive(false), 300)
        } else {
            setIsAddRoomActive(true);
            setTimeout(() => setIsAddRoomVisible(true), 50);
        }

    }

    const handleReference = () => {

        if (doReference.current) {
            //console.log("working")
            doReference.current.requestSubmit();
        }

    }

    const handleRoomReference = () => {

        if (doRoomReference.current) {
            doRoomReference.current.requestSubmit();
        }

    }

    const handleHotelImages = (event) => {
        const images = [];

        for (let i = 0; i < event.target.files.length; i++) {
            images.push(event.target.files[i]);
        }

        setHotelImages(images);
    }

    const handleHotelData = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get("name");
        const brand = formData.get("brand");
        const description = formData.get("description");
        const address = formData.get("address");
        const contact = formData.get("contact");

        const jsonBody = {
            name: name, brand: brand, description: description, address: address, contact: contact
        }

        console.log(jsonBody);
        console.log("token", token);

        const sendFormData = new FormData();
        sendFormData.append("token", token);
        sendFormData.append("hotelJsonDataString", btoa(JSON.stringify(jsonBody)));
        hotelImages.forEach((image) => {
            sendFormData.append("imageFiles", image)
        });

        const saveHotelData = async () => {
            const response = await fetch("http://localhost:8080/catalog/add-hotel",{
                method: "POST",
                headers: {"Authorization":`Bearer ${token}`},
                body: sendFormData
            });

            if (response.ok) {
                const data = await response.text();
                console.log(data);
                alert(data);
            } else {
                alert("server error");
            }

        }

        saveHotelData();

    }

    const handleRoomSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const roomNumber = formData.get("roomNumber");
        const description = formData.get("description");
        const children = formData.get("childrenNumber");
        const beds = formData.get("beds");
        const name = formData.get("name");
        const adultNumber = formData.get("adultNumber");
        const price = formData.get("price");
        const hotelId = formData.get("hotelId");

        const jsonBody = {
            roomNumber: roomNumber, description: description, childrenNo: children,
            beds: beds, name: name, adultNo: adultNumber, price: price,
        }

        console.log(jsonBody);

        const sendFormData = new FormData();
        sendFormData.append("token", token);
        sendFormData.append("roomJsonDataString", btoa(JSON.stringify(jsonBody)));
        sendFormData.append("hotelId", btoa(hotelId));
        roomImages.forEach((image) => {
            sendFormData.append("imageFiles", image)
        });

        const sendRoomData = async () => {
            const response = await fetch("http://localhost:8080/catalog/add-room", {
                method: "POST",
                headers: {"Authorization":`Bearer ${token}`},
                body: sendFormData
            });

            if (response.ok) {
                const data = await response.text();
                console.log(data);
                alert(data);
            } else {
                console.log("server error");
                alert("Server is not responding")
            }

        }

        sendRoomData();
    }

    const handleRoomImages = (event) => {
        const images = [];

        for (let i = 0; i < event.target.files.length; i++) {
            images.push(event.target.files[i]);
        }

        setRoomImages(images);
    }

    const handleClearForm = (whichForm) => {

        if (whichForm === "room") {
            console.log(whichForm);
            setRoomData({
                roomNumber: "", description: "", childrenNumber: "",
                beds: "", name: "", adultNumber: "", price: "", hotelId: ""
            });
            setRoomImages([]);
            const fileInput = document.querySelector('input[type="file"][placeholder="Room Images"]');
            if (fileInput) fileInput.value = '';
        } else if (whichForm === "hotel") {
            setHotelData({
                name: "", brand: "", description: "", address: "",
                contact: ""
            });
            setHotelImages([]);
            const fileInput = document.querySelector('input[type="file"][placeholder="Hotel Images"]');
            if (fileInput) fileInput.value = '';
        } else {
            setRemoveData({hotelId: "", roomNumber: ""})
        }

    }

    const handleRemoveReference = () => {
        
        if (doRemoveRoomReference.current) {
            doRemoveRoomReference.current.requestSubmit();
        }

    }

    const handleRemoveHotelReference = () => {

        if (doRemoveHotelReference.current) {
            doRemoveHotelReference.current.requestSubmit();
        }

    }

    const handleRemoveAllRoomReference = () => {

        if (doRemoveAllRoomReference.current) {
            doRemoveAllRoomReference.current.requestSubmit();
        }

    }

    const handleRemoveRoom = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const hotelId = btoa(formData.get("hotelId"));
        const roomNumber = btoa(formData.get("roomNumber"));

        const removeRoom = async () => {
            const response = await fetch(
                `http://localhost:8080/catalog/remove-rooms?token=${token}&roomNumber=${roomNumber}&hotelId=${hotelId}`, {
                    method: "DELETE",
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
                alert("The data is already been deleted....");
            }

        }

        removeRoom();
    }

    const handleRemoveAllRoomVisible = () => {
        setIsRemoveAllRoomVisible(!isRemoveAllRoomVisible);
        setIsRemoveHotelVisible(false);
        setIsRemoveRoomVisible(false);
    }

    const handleRemoveRoomVisible = () => {
        setIsRemoveRoomVisible(!isRemoveRoomVisible);
        setIsRemoveHotelVisible(false);
        setIsRemoveAllRoomVisible(false);
    }

    const handleRemoveHotelVisible = () => {
        setIsRemoveHotelVisible(!isRemoveHotelVisible);
        setIsRemoveAllRoomVisible(false);
        setIsRemoveRoomVisible(false);
    }

    const handleRemoveAllRoom = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const hotelId = btoa(formData.get("hotelId"));

        const removeRoom = async () => {
            const response = await fetch(
                `http://localhost:8080/catalog/remove-all-rooms?token=${token}&hotelId=${hotelId}`, {
                    method: "DELETE",
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
                alert("The data is already been deleted....");
            }

        }

        removeRoom();
    }

    const handleRemoveHotelAndRoom = () => {
        setIsRemoveHotelRoomVisible(!isRemoveHotelRoomVisible);
    }

    const handleRemoveHotel = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const hotelId = btoa(formData.get("hotelId"));

        const removeRoom = async () => {
            const response = await fetch(
                `http://localhost:8080/catalog/remove-hotel?token=${token}&hotelId=${hotelId}`, {
                    method: "DELETE",
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
                alert("The data is already been deleted....");
            }

        }

        removeRoom();
    }

    return (
        <section
            className="w-screen h-screen bg-[url('./components/assets/HomePageBackground.png')]
                bg-cover"
        >
            <header
                className="h-20 bg-red-500/15 backdrop-blur-lg border border-red-600/30
                    sticky flex flex-row items-center justify-between pl-5 pr-5"
            >
                <h1
                    className="text-red-600 font-bold"
                >
                    Admin Page
                </h1>
                <div
                    className="flex gap-4"
                >
                    <a
                        onClick={handleAddHotel}
                        className="rounded-2xl bg-yellow-500/15 backdrop-blur-lg border border-yellow-600/30
                            shadow-xl pt-2 pb-2 pl-5 pr-5 flex justify-center cursor-pointer hover:bg-amber-400/30
                            transition duration-300 ease-in-out"
                    >
                        <span
                            className="text-yellow-500 font-bold"
                        >
                            Add-Hotel
                        </span>
                    </a>
                    <a
                        onClick={handleAddRooms}
                        className="rounded-2xl bg-yellow-500/15 backdrop-blur-lg border border-yellow-600/30
                            shadow-xl pt-2 pb-2 pl-5 pr-5 flex justify-center cursor-pointer hover:bg-amber-400/30
                            transition duration-300 ease-in-out"
                    >
                        <span
                            className="text-yellow-500 font-bold"
                        >
                            Add-Rooms
                        </span>
                    </a>
                    <a
                        onClick={handleRemoveHotelAndRoom}
                        className="rounded-2xl bg-yellow-500/15 backdrop-blur-lg border border-yellow-600/30
                            shadow-xl pt-2 pb-2 pl-5 pr-5 flex justify-center cursor-pointer hover:bg-amber-400/30
                            transition duration-300 ease-in-out"
                    >
                        <span
                            className="text-yellow-500 font-bold"
                        >
                            Remove
                        </span>
                    </a>
                </div>
            </header>
            <main
                className="flex justify-center p-10"
            >
                {isAddHotelActive && (
                    <form
                        ref={doReference}
                        onSubmit={handleHotelData}
                        // fade in out animation is given here
                        className={`transform transition-all duration-300 ease-in-out ${
                            isAddHotelVisible? 'opacity-100 scale-100 pointer-events-auto'
                                : 'opacity-0 scale-95 pointer-events-none'
                            } mr-4 rounded-2xl bg-white/15 backdrop-blur-lg border border-white/30 max-w-4/5
                            p-5 flex flex-row gap-4`}
                    >
                        <div
                            className="rounded-xl bg-red-500/15 backdrop-blur-lg border border-red-600/30 
                            shadow-xl p-5"
                        >
                            <h2
                                className="text-yellow-500 font-bold"
                            >
                                Hotel Name:
                            </h2>
                            <input 
                                name="name"
                                placeholder="Hotel-Name"
                                type="text" required
                                value={hotelData.name}
                                onChange={(event) => setHotelData({...hotelData, name: event.target.value})}
                                className="w-full max-w-[400px] text-yellow-500 mb-3 border-2 border-amber-400 focus:bg-red-500/50
                                    rounded-xl pl-2 pt-1 pb-1 pr-1 font-bold focus:ring-0 focus:border-amber-600 focus:outline-none
                                    transition duration-300 ease-in-out"
                            />
                            <h2
                                className="text-yellow-500 font-bold"
                            >
                                Description:
                            </h2>
                            <input 
                                name="description"
                                placeholder="Description"
                                type="text" required
                                value={hotelData.description}
                                onChange={(event) => setHotelData({...hotelData, description: event.target.value})}
                                className="w-full max-w-[400px] text-yellow-500 mb-3 border-2 border-amber-400 focus:bg-red-500/50
                                    rounded-xl pl-2 pt-1 pb-1 pr-1 font-bold focus:ring-0 focus:border-amber-600 focus:outline-none
                                    transition duration-300 ease-in-out"
                            />
                            <h2
                                className="text-yellow-500 font-bold"
                            >
                                Contact:
                            </h2>
                            <input 
                                name="contact"
                                placeholder="Contact"
                                type="number" required
                                value={hotelData.contact}
                                onChange={(event) => setHotelData({...hotelData, contact: event.target.value})}
                                className="w-full max-w-[400px] text-yellow-500 border-2 border-amber-400 focus:bg-red-500/50
                                    rounded-xl pl-2 pt-1 pb-1 pr-1 font-bold focus:ring-0 focus:border-amber-600 focus:outline-none
                                    transition duration-300 ease-in-out"
                            />
                        </div>
                        <div
                            className="rounded-xl bg-red-500/15 backdrop-blur-lg border border-red-600/30 
                            shadow-xl p-5"
                        >
                            <h2
                                className="text-yellow-500 font-bold"
                            >
                                Brand:
                            </h2>
                            <input 
                                name="brand"
                                placeholder="Brand"
                                type="text" required
                                value={hotelData.brand}
                                onChange={(event) => setHotelData({...hotelData, brand: event.target.value})}
                                className="w-full max-w-[400px] text-yellow-500 mb-3 border-2 border-amber-400 focus:bg-red-500/50
                                    rounded-xl pl-2 pt-1 pb-1 pr-1 font-bold focus:ring-0 focus:border-amber-600 focus:outline-none
                                    transition duration-300 ease-in-out"
                            />
                            <h2
                                className="text-yellow-500 font-bold"
                            >
                                Address:
                            </h2>
                            <input 
                                name="address"
                                placeholder="Address"
                                type="text" required
                                value={hotelData.address}
                                onChange={(event) => setHotelData({...hotelData, address: event.target.value})}
                                className="w-full max-w-[400px] text-yellow-500 mb-3 border-2 border-amber-400 focus:bg-red-500/50
                                    rounded-xl pl-2 pt-1 pb-1 pr-1 font-bold focus:ring-0 focus:border-amber-600 focus:outline-none
                                    transition duration-300 ease-in-out"
                            />
                            <h2
                                className="text-yellow-500 font-bold"
                            >
                                Hotel Images:
                            </h2>
                            <input 
                                placeholder="Hotel Images"
                                type="file" required
                                className="text-yellow-500 mb-3 border-2 border-amber-400 focus:bg-red-500/50
                                    rounded-xl pl-2 pt-1 pb-1 pr-1 font-bold focus:ring-0 focus:border-amber-600 focus:outline-none
                                    transition duration-300 ease-in-out"
                                accept="image/*"
                                multiple
                                onChange={handleHotelImages}
                            />
                            <div
                                className="flex flex-row justify-center gap-10 p-5"
                            >
                                <a
                                    onClick={handleReference}
                                    className="pt-1 pl-5 pr-5 pb-1 flex justify-center bg-green-500/15 backdrop-blur-lg
                                        border border-green-500/30 shadow-xl hover:bg-green-500/30 transition
                                        duration-300 ease-in-out cursor-pointer rounded-2xl"
                                >
                                    <span
                                        className="text-green-600 font-bold"
                                    >
                                        Save
                                    </span>
                                </a>
                                <a
                                    onClick={() => handleClearForm("hotel")}
                                    className="pt-1 pl-5 pr-5 pb-1 flex justify-center bg-red-500/15 backdrop-blur-lg
                                        border border-red-500/30 shadow-xl hover:bg-red-500/30 transition
                                        duration-300 ease-in-out cursor-pointer rounded-2xl"
                                >
                                    <span
                                        className="text-red-600 font-bold"
                                    >
                                        Cancel
                                    </span>
                                </a>
                            </div>
                        </div>
                    </form>
                )}
                {isAddRoomActive && (
                    <form 
                        ref={doRoomReference}
                        onSubmit={handleRoomSubmit}
                        className={`transform transition-all duration-300 ease-in-out ${
                            isAddRoomVisible? 'opacity-100 scale-100 pointer-events-auto'
                                : 'opacity-0 scale-95 pointer-events-none'
                        } rounded-2xl bg-white/15 backdrop-blur-lg border border-white/30
                        max-w-4/5 p-5 flex flex-row gap-4 `}
                    >
                     <div
                            className="rounded-xl bg-red-500/15 backdrop-blur-lg border border-red-600/30 
                            shadow-xl p-5"
                        >
                            <h2
                                className="text-yellow-500 font-bold"
                            >
                                Room Number:
                            </h2>
                            <input 
                                name="roomNumber"
                                placeholder="Room Number"
                                type="number" required
                                value={roomData.roomNumber}
                                onChange={(event) => setRoomData({...roomData, roomNumber: event.target.value})}
                                className="w-full max-w-[400px] text-yellow-500 mb-3 border-2 border-amber-400 focus:bg-red-500/50
                                    rounded-xl pl-2 pt-1 pb-1 pr-1 font-bold focus:ring-0 focus:border-amber-600 focus:outline-none
                                    transition duration-300 ease-in-out"
                            />
                            <h2
                                className="text-yellow-500 font-bold"
                            >
                                Description:
                            </h2>
                            <input 
                                name="description"
                                placeholder="Description"
                                type="text" required
                                value={roomData.description}
                                onChange={(event) => setRoomData({...roomData, description: event.target.value})}
                                className="w-full max-w-[400px] text-yellow-500 mb-3 border-2 border-amber-400 focus:bg-red-500/50
                                    rounded-xl pl-2 pt-1 pb-1 pr-1 font-bold focus:ring-0 focus:border-amber-600 focus:outline-none
                                    transition duration-300 ease-in-out"
                            />
                            <h2
                                className="text-yellow-500 font-bold"
                            >
                                Children Number:
                            </h2>
                            <input 
                                name="childrenNumber"
                                placeholder="Children Number"
                                type="number" required
                                value={roomData.childrenNumber}
                                onChange={(event) => setRoomData({...roomData, childrenNumber: event.target.value})}
                                className="w-full max-w-[400px] text-yellow-500 border-2 border-amber-400 focus:bg-red-500/50
                                    rounded-xl pl-2 pt-1 pb-1 pr-1 font-bold focus:ring-0 focus:border-amber-600 focus:outline-none
                                    transition duration-300 ease-in-out"
                            />
                            <h2
                                className="text-yellow-500 font-bold mt-3"
                            >
                                Bed Number:
                            </h2>
                            <input 
                                name="beds"
                                placeholder="Number of Beds"
                                type="number" required
                                value={roomData.beds}
                                onChange={(event) => setRoomData({...roomData, beds:event.target.value})}
                                className="w-full max-w-[400px] text-yellow-500 border-2 border-amber-400 focus:bg-red-500/50
                                    rounded-xl pl-2 pt-1 pb-1 pr-1 font-bold focus:ring-0 focus:border-amber-600 focus:outline-none
                                    transition duration-300 ease-in-out "
                            />
                            <h2
                                className="text-yellow-500 font-bold mt-3"
                            >
                                Hotel ID:
                            </h2>
                            <input 
                                name="hotelId"
                                placeholder="Hotel ID"
                                type="text" required
                                value={roomData.hotelId}
                                onChange={(event) => setRoomData({...roomData, hotelId: event.target.value})}
                                className="w-full max-w-[400px] text-yellow-500 mb-3 border-2 border-amber-400 focus:bg-red-500/50
                                    rounded-xl pl-2 pt-1 pb-1 pr-1 font-bold focus:ring-0 focus:border-amber-600 focus:outline-none
                                    transition duration-300 ease-in-out"
                            />
                        </div>
                        <div
                            className="rounded-xl bg-red-500/15 backdrop-blur-lg border border-red-600/30 
                            shadow-xl p-5"
                        >
                            <h2
                                className="text-yellow-500 font-bold"
                            >
                                Room Name:
                            </h2>
                            <input 
                                name="name"
                                placeholder="Room Name"
                                type="text" required
                                value={roomData.name}
                                onChange={(event) => setRoomData({...roomData, name: event.target.value})}
                                className="w-full max-w-[400px] text-yellow-500 mb-3 border-2 border-amber-400 focus:bg-red-500/50
                                    rounded-xl pl-2 pt-1 pb-1 pr-1 font-bold focus:ring-0 focus:border-amber-600 focus:outline-none
                                    transition duration-300 ease-in-out"
                            />
                            <h2
                                className="text-yellow-500 font-bold"
                            >
                                Adult Number:
                            </h2>
                            <input 
                                name="adultNumber"
                                placeholder="Number of Adults"
                                type="number" required
                                value={roomData.adultNumber}
                                onChange={(event) => setRoomData({...roomData, adultNumber: event.target.value})}
                                className="w-full max-w-[400px] text-yellow-500 mb-3 border-2 border-amber-400 focus:bg-red-500/50
                                    rounded-xl pl-2 pt-1 pb-1 pr-1 font-bold focus:ring-0 focus:border-amber-600 focus:outline-none
                                    transition duration-300 ease-in-out"
                            />
                            <h2
                                className="text-yellow-500 font-bold"
                            >
                                Price:
                            </h2>
                            <input 
                                name="price"
                                placeholder="One night Stay Price"
                                type="number" required
                                value={roomData.price}
                                onChange={(event) => setRoomData({...roomData, price: event.target.value})}
                                className="w-full max-w-[400px] text-yellow-500 mb-3 border-2 border-amber-400 focus:bg-red-500/50
                                    rounded-xl pl-2 pt-1 pb-1 pr-1 font-bold focus:ring-0 focus:border-amber-600 focus:outline-none
                                    transition duration-300 ease-in-out"
                            />
                            <h2
                                className="text-yellow-500 font-bold"
                            >
                                Room Images:
                            </h2>
                            <input 
                                placeholder="Room Images"
                                type="file" required
                                className="text-yellow-500 mb-3 border-2 border-amber-400 focus:bg-red-500/50
                                    rounded-xl pl-2 pt-1 pb-1 pr-1 font-bold focus:ring-0 focus:border-amber-600 focus:outline-none
                                    transition duration-300 ease-in-out"
                                accept="image/*"
                                multiple
                                onChange={handleRoomImages}
                            />
                            <div
                                className="flex flex-row justify-center gap-10 p-5"
                            >
                                <a
                                    onClick={handleRoomReference}
                                    className="pt-1 pl-5 pr-5 pb-1 flex justify-center bg-green-500/15 backdrop-blur-lg
                                        border border-green-500/30 shadow-xl hover:bg-green-500/30 transition
                                        duration-300 ease-in-out cursor-pointer rounded-2xl"
                                >
                                    <span
                                        className="text-green-600 font-bold"
                                    >
                                        Save
                                    </span>
                                </a>
                                <a
                                    onClick={() => handleClearForm("room")}
                                    className="pt-1 pl-5 pr-5 pb-1 flex justify-center bg-red-500/15 backdrop-blur-lg
                                        border border-red-500/30 shadow-xl hover:bg-red-500/30 transition
                                        duration-300 ease-in-out cursor-pointer rounded-2xl"
                                >
                                    <span
                                        className="text-red-600 font-bold"
                                    >
                                        Cancel
                                    </span>
                                </a>
                            </div>
                        </div>
                    </form>
                )}
                {isRemoveHotelRoomVisible && (
                    <div
                        className="rounded-3xl bg-amber-300/15 backdrop-blur-lg border border-amber-400/30 shadow-xl
                            p-5 flex flex-col items-center justify-center ml-4 gap-3"
                    >
                        <a
                            onClick={handleRemoveHotelVisible}
                            className="pt-1 pl-5 pr-5 pb-1 flex justify-center bg-red-500/15 backdrop-blur-lg
                                border border-red-500/30 shadow-xl hover:bg-red-500/30 transition
                                duration-300 ease-in-out cursor-pointer rounded-2xl"
                        >
                            <span
                                className="text-red-600 font-bold"
                            >
                                Remove Hotel
                            </span>
                        </a>
                        {isRemoveHotelVisible && (
                            <form
                                ref={doRemoveHotelReference}
                                onSubmit={handleRemoveHotel}
                                className="rounded-2xl bg-white/15 backdrop-blur-lg border border-white/30 shadow-xl p-5"
                            >
                                <h2
                                    className="text-amber-700 font-bold"
                                >
                                    Hotel ID:
                                </h2>
                                <input 
                                    name="hotelId"
                                    placeholder="Hotel ID"
                                    type="text" required
                                    value={removeData.hotelId}
                                    onChange={(event) => setRemoveData({...removeData, hotelId: event.target.value})}
                                    className="w-full max-w-[400px] text-amber-700 mb-3 border-2 border-amber-700 focus:bg-red-500/50
                                        rounded-xl pl-2 pt-1 pb-1 pr-1 font-bold focus:ring-0 focus:border-amber-600 focus:outline-none
                                        transition duration-300 ease-in-out"
                                />
                                <div
                                    className="flex flex-row justify-center gap-10"
                                >
                                    <a
                                        onClick={handleRemoveHotelReference}
                                        className="pt-1 pl-5 pr-5 pb-1 flex justify-center bg-green-500/15 backdrop-blur-lg
                                            border border-green-500/30 shadow-xl hover:bg-green-500/30 transition
                                            duration-300 ease-in-out cursor-pointer rounded-2xl"
                                    >
                                        <span
                                            className="text-green-600 font-bold"
                                        >
                                            Remove
                                        </span>
                                    </a>
                                    <a
                                        onClick={() => handleClearForm("removeRoom")}
                                        className="pt-1 pl-5 pr-5 pb-1 flex justify-center bg-red-500/15 backdrop-blur-lg
                                            border border-red-500/30 shadow-xl hover:bg-red-500/30 transition
                                            duration-300 ease-in-out cursor-pointer rounded-2xl"
                                    >
                                        <span
                                            className="text-red-600 font-bold"
                                        >
                                            Cancel
                                        </span>
                                    </a>
                                    </div>
                            </form>
                        )}

                        <a
                        onClick={handleRemoveRoomVisible}
                        className="pt-1 pl-5 pr-5 pb-1 flex justify-center bg-red-500/15 backdrop-blur-lg
                                border border-red-500/30 shadow-xl hover:bg-red-500/30 transition
                                duration-300 ease-in-out cursor-pointer rounded-2xl"
                        >
                            <span
                                className="text-red-600 font-bold"
                            >
                                Remove Room
                            </span>
                        </a>
                        {isRemoveRoomVisible && (
                            <form
                                ref={doRemoveRoomReference}
                                onSubmit={handleRemoveRoom}
                                className="rounded-2xl bg-white/15 backdrop-blur-lg border border-white/30 shadow-xl p-5"
                            >
                                <h2
                                    className="text-amber-700 font-bold"
                                >
                                    Hotel ID:
                                </h2>
                                <input 
                                    name="hotelId"
                                    placeholder="Hotel ID"
                                    type="text" required
                                    value={removeData.hotelId}
                                    onChange={(event) => setRemoveData({...removeData, hotelId: event.target.value})}
                                    className="w-full max-w-[400px] text-amber-700 mb-3 border-2 border-amber-700 focus:bg-red-500/50
                                        rounded-xl pl-2 pt-1 pb-1 pr-1 font-bold focus:ring-0 focus:border-amber-600 focus:outline-none
                                        transition duration-300 ease-in-out"
                                />
                                <h2
                                    className="text-amber-700 font-bold"
                                >
                                    Room Number:
                                </h2>
                                <input 
                                    name="roomNumber"
                                    placeholder="Room Number"
                                    type="text" required
                                    value={removeData.roomNumber}
                                    onChange={(event) => setRemoveData({...removeData, roomNumber: event.target.value})}
                                    className="w-full max-w-[400px] text-amber-700 mb-3 border-2 border-amber-700 focus:bg-red-500/50
                                        rounded-xl pl-2 pt-1 pb-1 pr-1 font-bold focus:ring-0 focus:border-amber-600 focus:outline-none
                                        transition duration-300 ease-in-out"
                                />
                                <div
                                    className="flex flex-row justify-center gap-10"
                                >
                                    <a
                                        onClick={handleRemoveReference}
                                        className="pt-1 pl-5 pr-5 pb-1 flex justify-center bg-green-500/15 backdrop-blur-lg
                                            border border-green-500/30 shadow-xl hover:bg-green-500/30 transition
                                            duration-300 ease-in-out cursor-pointer rounded-2xl"
                                    >
                                        <span
                                            className="text-green-600 font-bold"
                                        >
                                            Remove
                                        </span>
                                    </a>
                                    <a
                                        onClick={() => handleClearForm("removeRoom")}
                                        className="pt-1 pl-5 pr-5 pb-1 flex justify-center bg-red-500/15 backdrop-blur-lg
                                            border border-red-500/30 shadow-xl hover:bg-red-500/30 transition
                                            duration-300 ease-in-out cursor-pointer rounded-2xl"
                                    >
                                        <span
                                            className="text-red-600 font-bold"
                                        >
                                            Cancel
                                        </span>
                                    </a>
                                </div>
                            </form>
                        )}        

                        <a
                            onClick={handleRemoveAllRoomVisible}
                            className="pt-1 pl-5 pr-5 pb-1 flex justify-center bg-red-500/15 backdrop-blur-lg
                                border border-red-500/30 shadow-xl hover:bg-red-500/30 transition
                                duration-300 ease-in-out cursor-pointer rounded-2xl"
                        >
                            <span
                                className="text-red-600 font-bold"
                            >
                                Remove All Room
                            </span>
                        </a>
                        {isRemoveAllRoomVisible && (
                            <form
                                ref={doRemoveAllRoomReference}
                                onSubmit={handleRemoveAllRoom}
                                className="rounded-2xl bg-white/15 backdrop-blur-lg border border-white/30 shadow-xl p-5"
                            >
                                <h2
                                    className="text-amber-700 font-bold"
                                >
                                    Hotel ID:
                                </h2>
                                <input 
                                    name="hotelId"
                                    placeholder="Hotel ID"
                                    type="text" required
                                    value={removeData.hotelId}
                                    onChange={(event) => setRemoveData({...removeData, hotelId: event.target.value})}
                                    className="w-full max-w-[400px] text-amber-700 mb-3 border-2 border-amber-700 focus:bg-red-500/50
                                        rounded-xl pl-2 pt-1 pb-1 pr-1 font-bold focus:ring-0 focus:border-amber-600 focus:outline-none
                                        transition duration-300 ease-in-out"
                                />
                                <div
                                    className="flex flex-row justify-center gap-10"
                                >
                                    <a
                                        onClick={handleRemoveAllRoomReference}
                                        className="pt-1 pl-5 pr-5 pb-1 flex justify-center bg-green-500/15 backdrop-blur-lg
                                            border border-green-500/30 shadow-xl hover:bg-green-500/30 transition
                                            duration-300 ease-in-out cursor-pointer rounded-2xl"
                                    >
                                        <span
                                            className="text-green-600 font-bold"
                                        >
                                            Remove
                                        </span>
                                    </a>
                                    <a
                                        onClick={() => handleClearForm("removeRoom")}
                                        className="pt-1 pl-5 pr-5 pb-1 flex justify-center bg-red-500/15 backdrop-blur-lg
                                            border border-red-500/30 shadow-xl hover:bg-red-500/30 transition
                                            duration-300 ease-in-out cursor-pointer rounded-2xl"
                                    >
                                        <span
                                            className="text-red-600 font-bold"
                                        >
                                            Cancel
                                        </span>
                                    </a>
                                    </div>
                            </form>
                        )}
                        
                    </div>
                )}
            </main>
        </section>
    );
}

export default AdminPage;