import { useEffect, useState, useRef } from "react";
import Image from "./assets/Profile.jpg"
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Invisible from "./assets/invisible.png"
import Visible from "./assets/visible.png"

function ProfilePage() {
    const [token, setToken] = useState(null);
    const [entityData, setEntityData] = useState(
        {
            id: "Username", firstName: "First Name", lastName: "Last Name",
            email: "E-Mail", address: "Address", bio: "Bio", phoneNumber: 123456789
        }
    );
    const [profileImage, setProfileImage] = useState(null);
    const [isEditing, setIsEditing] = useState(true);
    const navigate = useNavigate();
    const changeProfilePicture = useRef(null);
    const [isPasswordChangeOrAccount, setIsPasswordChangeOrAccount] = useState(true);
    const updateReference = useRef(null);
    const passwordReference = useRef(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState([false, false, false]);
    const [sendImage, setSendImage] = useState(null);

    useEffect(
        () => {
            const localToken = localStorage.getItem("token");

            if (localToken !== null) {
                setToken(localToken);
                const fetchUserData = async () => {
                    const response = await fetch(`http://localhost:8080/entity/fetch-entity?token=${localToken}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localToken}`
                        }
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        setEntityData({
                            id: data.id, firstName: data.firstName === null? "First Name" : data.firstName, 
                            lastName: data.lastName === null? "Last Name" : data.lastName, 
                            email: data.email === null? "Email@gmail.com" : data.email, 
                            address: data.address === null? "Address" : data.address, 
                            bio: data.bio === null? "Bio" : data.bio, 
                            phoneNumber: data.phoneNumber === null? "1234567890" : data.phoneNumber
                        });
                        setProfileImage(data.profileImage);
                    } else {
                        console.log("Bad request..")
                    }

                };
                fetchUserData();
            }

        },
    []);

    const handleEditing = () => {setIsEditing(false);};

    const handleProfileUpdate = (event) => {
        event.preventDefault();
        console.log("working 2");
        console.log(entityData);
        const confirm = window.confirm("Do you want to save this data.....");
        if (confirm && !isEditing && token !== null) {
            console.log("working 3");
            const updatedFormData = new FormData();
            updatedFormData.append("EntityJsonString", btoa(JSON.stringify(entityData)));
            updatedFormData.append("profileImage", sendImage);
            updatedFormData.append("token", token);
            const sendUpdatedData = async () => {
                const response = await fetch(`http://localhost:8080/entity/update-entity`, {
                    method: "POST", 
                    headers: {"Authorization": `Bearer ${token}`},
                    body: updatedFormData
                });

                if (response.ok) {
                    const data = await response.text();
                    console.log(data);

                    const fetchUserData = async () => {
                    const responseTwo = await fetch(`http://localhost:8080/entity/fetch-entity?token=${token}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    
                    if (responseTwo.ok) {
                        const data = await responseTwo.json();
                        console.log(data);
                        setEntityData({
                            id: data.id, firstName: data.firstName, lastName: data.lastName, 
                            email: data.email, address: data.address, bio: data.bio, phoneNumber: data.phoneNumber
                        });
                        setProfileImage(data.profileImage);
                    } else {
                        console.log("Bad request..")
                    }

                };
                fetchUserData();

                } else {
                    console.log("update is not successful.....");
                }

            }
            sendUpdatedData();
        } else {
            alert("Something is wrong.....")
        }
        setIsEditing(true);
    };

    const handleRemoveAccount = () => {
        const confirm = window.confirm("Want to delete this account...?");
            if (confirm) {
                const removeAccount = async () => {
                const response = await fetch(`http://localhost:8080/entity/remove-account?token=${token}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.text();
                    console.log(data);
                } else {
                    console.log("Either it is already been delete or there is no such entity.....");
                }

            }
            removeAccount();
            localStorage.clear();
            navigate("/")
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setEntityData(data => ({...data, [name]:value}));
    };

    const handleLogout = () => {
        localStorage.clear();
        alert("You have been logout....");
        navigate("/");
    }

    const handleReturnHome = () => {
        navigate("/");
    }

    const handleProfileImageChange = () => {

        if (!isEditing) {
            changeProfilePicture.current.click();
        }

    }

    const handleImageChange = (image) => {
        const file = image.target.files[0];

        if (file) {
            setSendImage(file)
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result.split(",")[1];
                setProfileImage({
                    type: file.type,
                    data: base64String
                });
            }
            reader.readAsDataURL(file)
        }

    }

    const handlePasswordOrAccount = (value) => {
        setIsPasswordChangeOrAccount(value);
    }

    const handlePasswordChange = (event) => {
        event.preventDefault();
        const userFormData = new FormData(event.target);
        const username = userFormData.get("id");
        const oldPassword = userFormData.get("initialPassword");
        const newPassword = userFormData.get("newPassword");
        const confirmNewPassword = userFormData.get("confirmPassword");

        if (newPassword === confirmNewPassword && token !== null) {
            const data = jwtDecode(token);
            const role = data.roles[0] === "ROLE_ADMIN" && data.roles !== null? "admin" : "user";
            const jsonBodyType = {username: username, password: oldPassword, role: role};
            const checkPassword = async () => {
                const response = await fetch (`http://localhost:8080/user/sign-in`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(jsonBodyType)
                });

                if (response.ok) {
                    console.log("checked");
                    const jsonBodyTypeTwo = {username: username, password: newPassword, role: role}
                    const updatePassword = async () => {
                        const responseTwo = await fetch (`http://localhost:8080/user/sign-up?passwordChange=${true}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(jsonBodyTypeTwo)
                        });

                        if (responseTwo.ok) {
                            console.log("password update successfully...")
                            const jsonBodyTypeThree = {username: username, password: newPassword, role: role};
                            const doSignIn = async () => {
                                const responseThree = await fetch (`http://localhost:8080/user/sign-in`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(jsonBodyTypeThree)
                                });

                                if (responseThree.ok) {
                                    const data = await response.text();
                                    localStorage.setItem("token", data);
                                    alert("Password Updated successfully....");
                                } else {
                                    console.log("server error")
                                }

                            }
                            doSignIn();
                        } else {
                            console.log("internal error......")
                        }

                    }
                    updatePassword();
                }

            }
            checkPassword();
        } else {
            alert("The password do not matched.....")
        }

    }

    const handleUserPasswordChange = () => {
        
        if (passwordReference.current) {
            passwordReference.current.requestSubmit();
        }
        
    }

    const handleEntityUpdate = () => {

        if (updateReference.current) {
            updateReference.current.requestSubmit();
        }

    }

    const handlePasswordHiding = (number) => {
        if (number === 0) {
            setIsPasswordVisible([!isPasswordVisible[0], isPasswordVisible[1], isPasswordVisible[2]]);
        } else if (number === 1) {
            setIsPasswordVisible([isPasswordVisible[0], !isPasswordVisible[1], isPasswordVisible[2]]);
        } else {
            setIsPasswordVisible([isPasswordVisible[0], isPasswordVisible[1], !isPasswordVisible[2]]);
        }
    }

    return (
        <section
            className="fixed inset-0 bg-[url('./components/assets/background.png')] bg-cover bg-center
                flex flex-row"
        >
            <div
                className="rounded-2xl bg-white/15 backdrop-blur-lg border border-white/30 shadow-xl
                    p-10 w-[30%] h-[90%] m-10 "
            >
                <div className="h-[50%] flex justify-center">
                    <img 
                        src={profileImage === null? Image : `data:${profileImage.type};Base64,${profileImage.data}`} 
                        alt="profile image" 
                        className="rounded-[50%] w-[70%] h-[90%] object-cover"
                    />
                </div>
                <div className="m-7 flex flex-col gap-7 w-[80%]">
                    {!isEditing && (
                        <div>
                            <a
                                onClick={handleProfileImageChange}
                                className="rounded-3xl bg-gray-500/25 backdrop-blur-lg border border-gray-500/60
                                shadow-xl hover:bg-gray-600/30 cursor-pointer p-2 flex justify-center 
                                transition-all duration-300 ease-in-out"
                            >
                                <span className="text-lg font-bold text-gray-700">Change Profile IMG</span>
                            </a>
                            <input
                                type="file"
                                accept="image/*"
                                style={{display: "none"}}
                                required
                                ref={changeProfilePicture}
                                onChange={handleImageChange}
                            />
                        </div>
                    )}
                    <a 
                        onClick={() => handlePasswordOrAccount(true)}
                        className="rounded-3xl bg-green-500/15 backdrop-blur-lg border border-green-500/30
                            shadow-xl hover:bg-green-600/25 cursor-pointer p-2 flex justify-center
                            transition-all duration-300 ease-in-out"
                        >
                            <span className="text-lg font-bold text-green-700">Account Settings</span>
                    </a>
                    <a
                        onClick={() => handlePasswordOrAccount(false)}
                        className="rounded-3xl bg-blue-500/25 backdrop-blur-lg border border-blue-500/60
                            shadow-xl hover:bg-blue-600/30 cursor-pointer p-2 flex justify-center 
                            transition-all duration-300 ease-in-out"
                    >
                        <span className="text-lg font-bold text-blue-700">Change Password</span>
                    </a>
                    <a
                        onClick={handleLogout}
                        className="rounded-3xl bg-red-500/25 backdrop-blur-lg border border-red-500/60
                            shadow-xl hover:bg-red-600/30 cursor-pointer p-2 flex justify-center
                            transition-all duration-300 ease-in-out"
                    >
                        <span className="text-lg font-bold text-red-700">Log-Out</span>
                    </a>
                </div>
            </div>
            {isPasswordChangeOrAccount? (
                <div
                className="rounded-2xl bg-white/15 backdrop-blur-lg border border-white/30 shadow-xl
                    p-10 w-[70%] h-[90%] ml-2 mt-10 mr-10"
            >
                <h2
                    className="text-black text-3xl font-bold cursor-default"
                >
                    Account Settings
                </h2>
                <form ref={updateReference} onSubmit={handleProfileUpdate}>
                    <div className="flex flex-col justify-center">
                        <div className="m-5 flex flex-row gap-2">
                            <div className="flex flex-col w-[70%]">
                                <h2 className="text-bold text-xl text-gray-600">E-Mail</h2>
                                <input
                                    type="email"
                                    name="email"
                                    value={entityData.email}
                                    readOnly={isEditing}
                                    onChange={handleChange}
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
                                    value={entityData.id}
                                    readOnly={isEditing}
                                    onChange={handleChange}
                                    required
                                    placeholder="--username--"
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
                                    value={entityData.firstName}
                                    readOnly={isEditing}
                                    onChange={handleChange}
                                    required
                                    placeholder="--first name--"
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
                                    value={entityData.lastName}
                                    readOnly={isEditing}
                                    onChange={handleChange}
                                    required
                                    placeholder="--last name--"
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
                                        value={entityData.address}
                                        readOnly={isEditing}
                                        onChange={handleChange}
                                        required
                                        placeholder="--address--"
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
                                        value={entityData.bio}
                                        readOnly={isEditing}
                                        onChange={handleChange}
                                        required
                                        placeholder="--bio--"
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
                                        value={entityData.phoneNumber}
                                        readOnly={isEditing}
                                        onChange={handleChange}
                                        required
                                        className="p-2 rounded-3xl bg-white/15 border border-white/30 backdrop-blur-lg shadow-xl
                                            mt-1 hover:bg-amber-400/15 transition ease-in-out duration-300 text-amber-800
                                            focus:outline-none focus:ring-1 focus:border-amber-400/30 focus:ring-amber-400/30"
                                    />
                                </div>
                            </div>
                            <div className="m-5 flex flex-col gap-10 w-[30%]">
                                   
                                {
                                    !isEditing? (
                                        <a
                                            onClick={handleEntityUpdate}
                                            className="mt-3 rounded-3xl bg-amber-500/15 backdrop-blur-lg border border-amber-500/30
                                                shadow-xl hover:bg-amber-600/25 cursor-pointer p-2 flex justify-center
                                                transition-all duration-300 ease-in-out"
                                        >
                                            <span  className="text-lg font-bold text-amber-700"> Save Profile</span>
                                        </a>
                                    ) : (
                                        <a
                                            onClick={handleEditing}
                                            className="mt-3 rounded-3xl bg-amber-500/15 backdrop-blur-lg border border-amber-500/30
                                                shadow-xl hover:bg-amber-600/25 cursor-pointer p-2 flex justify-center
                                                transition-all duration-300 ease-in-out"
                                        >                                            
                                            <span  className="text-lg font-bold text-amber-700"> Edit Profile</span>
                                        </a>
                                        )
                                    }
                                <a
                                    onClick={handleRemoveAccount}
                                    className="mt-7 rounded-3xl bg-red-500/25 backdrop-blur-lg border border-red-500/60
                                        shadow-xl hover:bg-red-600/30 cursor-pointer p-2 flex justify-center
                                        transition-all duration-300 ease-in-out"
                                >
                                    <span className="text-lg font-bold text-red-700">Remove Profile</span>
                                </a>
                                <a
                                    onClick={handleReturnHome}
                                    className="mt-7 rounded-3xl bg-yellow-500/25 backdrop-blur-lg border border-yellow-500/60
                                        shadow-xl hover:bg-yellow-600/30 cursor-pointer p-2 flex justify-center
                                        transition-all duration-300 ease-in-out"
                                >
                                    <span className="text-lg font-bold text-yellow-700">Home</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            ) : (
                <div
                className="rounded-2xl bg-white/15 backdrop-blur-lg border border-white/30 shadow-xl
                    p-10 w-[70%] h-[90%] ml-2 mt-10 mr-10"
            >
                <h2
                    className="text-black text-3xl font-bold cursor-default"
                >
                    Account Password Settings
                </h2>
                <form ref={passwordReference} onSubmit={handlePasswordChange}>
                    <div className="flex flex-col justify-center">
                        <div className="m-5 flex flex-row gap-2">
                            <div className="flex flex-col w-[70%]">
                                <h2 className="text-bold text-xl text-gray-600">Username</h2>
                                <input
                                    type="text"
                                    name="id"
                                    value={entityData.id}
                                    readOnly={true}
                                    required
                                    placeholder="--username--"
                                    className="p-2 rounded-3xl bg-white/15 border border-white/30 backdrop-blur-lg shadow-xl
                                        mt-1 hover:bg-amber-400/15 transition ease-in-out duration-300 text-amber-800
                                        focus:outline-none focus:ring-1 focus:border-amber-400/30 focus:ring-amber-400/30
                                        cursor-default"
                                />
                            </div>
                        </div>
                        <div className="m-5 flex flex-row gap-2">
                            <div className="flex flex-col gap-10 w-[70%]">
                                <div className="flex flex-col">
                                    <h2 className="text-bold text-xl text-gray-600">Initial Password</h2>
                                    <div className="flex flex-row">
                                        <input
                                            type={isPasswordVisible[0]? "text" : "password"}
                                            name="initialPassword"
                                            onChange={handleChange}
                                            required
                                            placeholder="--initial password--"
                                            className="p-2 rounded-tl-3xl rounded-bl-3xl bg-white/15 border border-white/30 backdrop-blur-lg shadow-xl
                                                mt-1 hover:bg-amber-400/15 transition ease-in-out duration-300 text-amber-800
                                                focus:outline-none focus:ring-1 focus:border-amber-400/30 focus:ring-amber-400/30
                                                w-[90%]"
                                        />
                                        <a
                                            onClick={() => handlePasswordHiding(0)}
                                            className="p-2 rounded-tr-3xl rounded-br-3xl bg-white/15 border border-white/30 backdrop-blur-lg shadow-xl
                                                mt-1 hover:bg-amber-400/15 transition ease-in-out duration-300 text-amber-800
                                                focus:outline-none focus:ring-1 focus:border-amber-400/30 focus:ring-amber-400/30
                                                w-[10%] flex justify-center items-center"
                                        >
                                            <img 
                                                src={isPasswordVisible[0]? Invisible : Visible}
                                                className="w-[60%] h-[90%]"
                                            />
                                        </a>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-bold text-xl text-gray-600">New Password</h2>
                                    <div className="flex flex-row">
                                        <input
                                            type={isPasswordVisible[1]? "text" : "password"}
                                            name="newPassword"
                                            onChange={handleChange}
                                            required
                                            placeholder="--New Password--"
                                            className="p-2 rounded-tl-3xl rounded-bl-3xl bg-white/15 border border-white/30 backdrop-blur-lg shadow-xl
                                                mt-1 hover:bg-amber-400/15 transition ease-in-out duration-300 text-amber-800
                                                focus:outline-none focus:ring-1 focus:border-amber-400/30 focus:ring-amber-400/30
                                                w-[90%]"
                                        />
                                        <a
                                            onClick={() => handlePasswordHiding(1)}
                                            className="p-2 rounded-tr-3xl rounded-br-3xl bg-white/15 border border-white/30 backdrop-blur-lg shadow-xl
                                                mt-1 hover:bg-amber-400/15 transition ease-in-out duration-300 text-amber-800
                                                focus:outline-none focus:ring-1 focus:border-amber-400/30 focus:ring-amber-400/30
                                                w-[10%] flex justify-center items-center"
                                        >
                                            <img 
                                                src={isPasswordVisible[1]? Invisible : Visible}
                                                className="w-[60%] h-[90%]"
                                            />
                                        </a>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-bold text-xl text-gray-600">Confirm Password</h2>
                                    <div
                                        className="flex flex-row"
                                    >
                                        <input
                                            type={isPasswordVisible[2]? "text" : "password"}
                                            name="confirmPassword"
                                            onChange={handleChange}
                                            required
                                            placeholder="--Confirm Password--"
                                            className="p-2 rounded-tl-3xl rounded-bl-3xl bg-white/15 border border-white/30 backdrop-blur-lg shadow-xl
                                                mt-1 hover:bg-amber-400/15 transition ease-in-out duration-300 text-amber-800
                                                focus:outline-none focus:ring-1 focus:border-amber-400/30 focus:ring-amber-400/30
                                                w-[90%]"
                                        />
                                        <a
                                            onClick={() => handlePasswordHiding(2)}
                                            className="p-2 rounded-tr-3xl rounded-br-3xl bg-white/15 border border-white/30 backdrop-blur-lg shadow-xl
                                                mt-1 hover:bg-amber-400/15 transition ease-in-out duration-300 text-amber-800
                                                focus:outline-none focus:ring-1 focus:border-amber-400/30 focus:ring-amber-400/30
                                                w-[10%] flex justify-center items-center"
                                        >
                                            <img 
                                                src={isPasswordVisible[2]? Invisible : Visible}
                                                className="w-[60%] h-[90%]"
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="m-5 flex flex-col gap-10 w-[30%]">
                                <a
                                    onClick={handleUserPasswordChange}
                                    className="mt-3 rounded-3xl bg-green-500/25 backdrop-blur-lg border border-green-500/60
                                        shadow-xl hover:bg-green-600/30 cursor-pointer p-2 flex justify-center
                                        transition-all duration-300 ease-in-out"
                                >
                                    <span className="text-lg font-bold text-green-700">Save Password</span>
                                </a>
                                <a
                                    onClick={handleReturnHome}
                                    className="mt-7 rounded-3xl bg-yellow-500/25 backdrop-blur-lg border border-yellow-500/60
                                        shadow-xl hover:bg-yellow-600/30 cursor-pointer p-2 flex justify-center
                                        transition-all duration-300 ease-in-out"
                                >
                                    <span className="text-lg font-bold text-yellow-700">Home</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            )}
            
        </section>
    )

}

export default ProfilePage;