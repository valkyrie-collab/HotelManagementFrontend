// import { useEffect, useState, useRef } from "react";
import profileImage from "./assets/Profile.jpg"

function ProfilePage() {

    return (
        <section
            className="fixed inset-0 bg-[url('./components/assets/background.png')] bg-cover bg-center
                flex flex-row"
        >
            <div
                className="rounded-2xl bg-white/15 backdrop-blur-lg border border-white/30 shadow-xl
                    p-10 w-[30%] h-[90%] m-10"
            >
                <div className="h-[50%] flex justify-center">
                    <img 
                        src={profileImage} 
                        alt="profile image" 
                        className="rounded-[50%]"
                    />
                </div>
                <div className="m-10 flex flex-col gap-10 w-[80%]">
                    <a
                        className="rounded-3xl bg-green-500/15 backdrop-blur-lg border border-green-500/30
                            shadow-xl hover:bg-green-600/25 cursor-pointer p-2 flex justify-center"
                        >
                            <span className="text-lg font-bold text-green-700">Account Settings</span>
                    </a>
                    <a
                        className="rounded-3xl bg-blue-500/25 backdrop-blur-lg border border-blue-500/60
                            shadow-xl hover:bg-blue-600/30 cursor-pointer p-2 flex justify-center"
                    >
                        <span className="text-lg font-bold text-blue-700">Change Password</span>
                    </a>
                    <a
                        className="rounded-3xl bg-red-500/25 backdrop-blur-lg border border-red-500/60
                            shadow-xl hover:bg-red-600/30 cursor-pointer p-2 flex justify-center"
                    >
                        <span className="text-lg font-bold text-red-700">Log-Out</span>
                    </a>
                </div>
            </div>
            <div
                className="rounded-2xl bg-white/15 backdrop-blur-lg border border-white/30 shadow-xl
                    p-10 w-[70%] h-[90%] ml-2 mt-10 mr-10"
            >
                <h2
                    className="text-black text-3xl font-bold cursor-default"
                >
                    Account Settings
                </h2>
                <form>
                    <div className="flex flex-col justify-center">
                        <div className="m-5 flex flex-row gap-2">
                            <div className="flex flex-col w-[70%]">
                                <h2 className="text-bold text-xl text-gray-600">E-Mail</h2>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="p-2 rounded-3xl bg-white/15 border border-white/30 backdrop-blur-lg shadow-xl
                                        mt-1 hover:bg-amber-400/15 transition ease-in-out duration-300 text-amber-800
                                        focus:outline-none focus:ring-1 focus:border-amber-400/30 focus:ring-amber-400/30"
                                />
                            </div>
                            <div className="flex flex-col w-[30%]">
                                <h2 className="text-bold text-xl text-gray-600">Username</h2>
                                <input
                                    type="text"
                                    name="id"
                                    required
                                    className="p-2 rounded-3xl bg-white/15 border border-white/30 backdrop-blur-lg shadow-xl
                                        mt-1 hover:bg-amber-400/15 transition ease-in-out duration-300 text-amber-800
                                        focus:outline-none focus:ring-1 focus:border-amber-400/30 focus:ring-amber-400/30"
                                />
                            </div>
                        </div>
                        <div
                            className="m-5 flex flex-row gap-2"
                        >
                            <div className="flex flex-col w-[50%]">
                                <h2 className="text-bold text-xl text-gray-600">First Name</h2>
                                <input
                                    type="text"
                                    name="firstName"
                                    required
                                    className="p-2 rounded-3xl bg-white/15 border border-white/30 backdrop-blur-lg shadow-xl
                                        mt-1 hover:bg-amber-400/15 transition ease-in-out duration-300 text-amber-800
                                        focus:outline-none focus:ring-1 focus:border-amber-400/30 focus:ring-amber-400/30"
                                />
                            </div>
                            <div className="flex flex-col w-[50%]">
                                <h2 className="text-bold text-xl text-gray-600">Last Name</h2>
                                <input
                                    type="text"
                                    name="lastName"
                                    required
                                    className="p-2 rounded-3xl bg-white/15 border border-white/30 backdrop-blur-lg shadow-xl
                                        mt-1 hover:bg-amber-400/15 transition ease-in-out duration-300 text-amber-800
                                        focus:outline-none focus:ring-1 focus:border-amber-400/30 focus:ring-amber-400/30"
                                />
                            </div>
                        </div>
                        <div className="m-5 flex flex-row gap-2">
                            <div className="flex flex-col gap-10 w-[70%]">
                                <div className="flex flex-col">
                                    <h2 className="text-bold text-xl text-gray-600">Address</h2>
                                    <input
                                        type="text"
                                        name="address"
                                        required
                                        className="p-2 rounded-3xl bg-white/15 border border-white/30 backdrop-blur-lg shadow-xl
                                            mt-1 hover:bg-amber-400/15 transition ease-in-out duration-300 text-amber-800
                                            focus:outline-none focus:ring-1 focus:border-amber-400/30 focus:ring-amber-400/30"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-bold text-xl text-gray-600">Bio</h2>
                                    <input
                                        type="text"
                                        name="bio"
                                        required
                                        className="p-2 rounded-3xl bg-white/15 border border-white/30 backdrop-blur-lg shadow-xl
                                            mt-1 hover:bg-amber-400/15 transition ease-in-out duration-300 text-amber-800
                                            focus:outline-none focus:ring-1 focus:border-amber-400/30 focus:ring-amber-400/30"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-bold text-xl text-gray-600">Phone Number</h2>
                                    <input
                                        type="number"
                                        name="phoneNumber"
                                        required
                                        className="p-2 rounded-3xl bg-white/15 border border-white/30 backdrop-blur-lg shadow-xl
                                            mt-1 hover:bg-amber-400/15 transition ease-in-out duration-300 text-amber-800
                                            focus:outline-none focus:ring-1 focus:border-amber-400/30 focus:ring-amber-400/30"
                                    />
                                </div>
                            </div>
                            <div className="m-5 flex flex-col gap-10 w-[30%]">
                                <a
                                    className="mt-3 rounded-3xl bg-amber-500/15 backdrop-blur-lg border border-amber-500/30
                                        shadow-xl hover:bg-amber-600/25 cursor-pointer p-2 flex justify-center"
                                >
                                    <span className="text-lg font-bold text-amber-700">Edit Profile</span>
                                </a>
                                <a
                                    className="mt-7 rounded-3xl bg-red-500/25 backdrop-blur-lg border border-red-500/60
                                        shadow-xl hover:bg-red-600/30 cursor-pointer p-2 flex justify-center"
                                >
                                    <span className="text-lg font-bold text-red-700">Remove Profile</span>
                                </a>
                                <a
                                    className="mt-7 rounded-3xl bg-yellow-500/25 backdrop-blur-lg border border-yellow-500/60
                                        shadow-xl hover:bg-yellow-600/30 cursor-pointer p-2 flex justify-center"
                                >
                                    <span className="text-lg font-bold text-yellow-700">Home</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )

}

export default ProfilePage;