import { useRef, useState } from "react";

function Testing() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);
  const [isAddRoom, setIsAddRoom] = useState(false);
  const [hotelImages, setHotelImages] = useState([]);
  const doReference = useRef(null);
  const token = localStorage.getItem("token");

  const handleAddHotel = () => {
    if (!isFormVisible) {
      // Show form
      setIsFormActive(true);
      setTimeout(() => setIsFormVisible(true), 50);
    } else {
      // Hide form
      setIsFormVisible(false);
      setTimeout(() => setIsFormActive(false), 300); // Match Tailwind duration
    }
  };

  const handleAddRooms = () => {
    setIsAddRoom(!isAddRoom);
  };

  const handleReference = () => {
    if (doReference.current) {
      doReference.current.requestSubmit();
    }
  };

  const handleHotelImages = (event) => {
    const images = [];
    for (let i = 0; i < event.target.files.length; i++) {
      images.push(event.target.files[i]);
    }
    setHotelImages(images);
  };

  const handleHotelData = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const brand = formData.get("brand");
    const description = formData.get("description");
    const address = formData.get("address");
    const contact = formData.get("contact");

    const jsonBody = {
      name,
      brand,
      description,
      address,
      contact,
    };

    console.log(jsonBody);
    console.log("token", token);

    const sendFormData = new FormData();
    sendFormData.append("token", token);
    sendFormData.append("hotelJsonDataString", JSON.stringify(jsonBody));
    hotelImages.forEach((image) => {
      sendFormData.append("imageFiles", image);
    });

    try {
      const response = await fetch("http://localhost:8080/catalog/add-hotel", {
        method: "POST",
        body: sendFormData,
      });

      if (response.ok) {
        const data = await response.text();
        console.log(data);
        alert(data);
      } else {
        alert("Server error");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error");
    }
  };

  return (
    <section className="w-screen h-screen bg-[url('./components/assets/HomePageBackground.png')] bg-cover">
      <header className="h-20 bg-red-500/15 backdrop-blur-lg border border-red-600/30 sticky flex flex-row items-center justify-between pl-5 pr-5">
        <h1 className="text-red-600 font-bold">Admin Page</h1>
        <div className="flex gap-4">
          <a
            onClick={handleAddHotel}
            className="rounded-2xl bg-yellow-500/15 backdrop-blur-lg border border-yellow-600/30 shadow-xl pt-2 pb-2 pl-5 pr-5 flex justify-center cursor-pointer hover:bg-amber-400/30 transition duration-300 ease-in-out"
          >
            <span className="text-yellow-500 font-bold">Add-Hotel</span>
          </a>
          <a
            onClick={handleAddRooms}
            className="rounded-2xl bg-yellow-500/15 backdrop-blur-lg border border-yellow-600/30 shadow-xl pt-2 pb-2 pl-5 pr-5 flex justify-center cursor-pointer hover:bg-amber-400/30 transition duration-300 ease-in-out"
          >
            <span className="text-yellow-500 font-bold">Add-Rooms</span>
          </a>
        </div>
      </header>

      <main className="flex justify-center p-10">
        {isFormActive && (
          <form
            ref={doReference}
            onSubmit={handleHotelData}
            className={`transform transition-all duration-300 ease-in-out ${
              isFormVisible
                ? 'opacity-100 scale-100 pointer-events-auto'
                : 'opacity-0 scale-95 pointer-events-none'
            } rounded-2xl bg-white/15 backdrop-blur-lg border border-white/30 max-w-4/5 p-5 flex flex-row gap-4`}
          >
            <div className="rounded-xl bg-red-500/15 backdrop-blur-lg border border-red-600/30 shadow-xl p-5">
              <h2 className="text-yellow-500 font-bold">Hotel Name:</h2>
              <input
                name="name"
                placeholder="Hotel-Name"
                type="text"
                required
                className="w-full max-w-[400px] text-yellow-500 mb-3 border-2 border-amber-400 focus:bg-red-500/50 rounded-xl pl-2 pt-1 pb-1 pr-1 font-bold focus:ring-0 focus:border-amber-600 focus:outline-none transition duration-300 ease-in-out"
              />
              <h2 className="text-yellow-500 font-bold">Description:</h2>
              <input
                name="description"
                placeholder="Description"
                type="text"
                required
                className="w-full max-w-[400px] text-yellow-500 mb-3 border-2 border-amber-400 focus:bg-red-500/50 rounded-xl pl-2 pt-1 pb-1 pr-1 font-bold focus:ring-0 focus:border-amber-600 focus:outline-none transition duration-300 ease-in-out"
              />
              <h2 className="text-yellow-500 font-bold">Contact:</h2>
              <input
                name="contact"
                placeholder="Contact"
                type="number"
                required
                className="w-full max-w-[400px] text-yellow-500 border-2 border-amber-400 focus:bg-red-500/50 rounded-xl pl-2 pt-1 pb-1 pr-1 font-bold focus:ring-0 focus:border-amber-600 focus:outline-none transition duration-300 ease-in-out"
              />
            </div>
            <div className="rounded-xl bg-red-500/15 backdrop-blur-lg border border-red-600/30 shadow-xl p-5">
              <h2 className="text-yellow-500 font-bold">Brand:</h2>
              <input
                name="brand"
                placeholder="Brand"
                type="text"
                required
                className="w-full max-w-[400px] text-yellow-500 mb-3 border-2 border-amber-400 focus:bg-red-500/50 rounded-xl pl-2 pt-1 pb-1 pr-1 font-bold focus:ring-0 focus:border-amber-600 focus:outline-none transition duration-300 ease-in-out"
              />
              <h2 className="text-yellow-500 font-bold">Address:</h2>
              <input
                name="address"
                placeholder="Address"
                type="text"
                required
                className="w-full max-w-[400px] text-yellow-500 mb-3 border-2 border-amber-400 focus:bg-red-500/50 rounded-xl pl-2 pt-1 pb-1 pr-1 font-bold focus:ring-0 focus:border-amber-600 focus:outline-none transition duration-300 ease-in-out"
              />
              <h2 className="text-yellow-500 font-bold">Hotel Images:</h2>
              <input
                placeholder="Hotel Images"
                type="file"
                required
                className="text-yellow-500 mb-3 border-2 border-amber-400 focus:bg-red-500/50 rounded-xl pl-2 pt-1 pb-1 pr-1 font-bold focus:ring-0 focus:border-amber-600 focus:outline-none transition duration-300 ease-in-out"
                accept="image/*"
                multiple
                onChange={handleHotelImages}
              />
              <div className="flex flex-row justify-center gap-10 p-5">
                <a
                  onClick={handleReference}
                  className="pt-1 pl-5 pr-5 pb-1 flex justify-center bg-green-500/15 backdrop-blur-lg border border-green-500/30 shadow-xl hover:bg-green-500/30 transition duration-300 ease-in-out cursor-pointer rounded-2xl"
                >
                  <span className="text-green-600 font-bold">Save</span>
                </a>
                <a
                  className="pt-1 pl-5 pr-5 pb-1 flex justify-center bg-red-500/15 backdrop-blur-lg border border-red-500/30 shadow-xl hover:bg-red-500/30 transition duration-300 ease-in-out cursor-pointer rounded-2xl"
                >
                  <span className="text-red-600 font-bold">Cancel</span>
                </a>
              </div>
            </div>
          </form>
        )}
      </main>
    </section>
  );
}

export default Testing;
