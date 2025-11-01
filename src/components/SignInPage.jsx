import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SignInBackground from "./assets/SignInBackground.PNG"
import SignUpBackground from "./assets/SignUpBackground.PNG"
import Invisible from "./assets/invisible.png"
import Visible from "./assets/visible.png"

function SignInPage() {
    // const [signUp, setSignUp] = useState(false);
    const [isPasswordSignIn, setIsPasswordSignIn] = useState(false);
    const [isPasswordSignUp, setIsPasswordSignUp] = useState([false, false]);
    const [isSignIn, setIsSignIn] = useState(true);
    const signInFormRef = useRef(null);
    const signUpFormRef = useRef(null);
    // const signInDivRef = useRef(null);
    // const signUpDivRef = useRef(null);
    // const signUpBackgroundImage = useRef(null);
    // const signInBackgroundImage = useRef(null);
    const navigate = useNavigate();
    // useEffect(
    //     () => {
    //         console.log(signUp);
    //     },
    // [signUp])
    const [userData, setUserData] = useState({username: "username", password: "password", role: "role"});

    const handleSignInSubmit = () => {
        
        if (signInFormRef.current) {
            // console.log("working");
            signInFormRef.current.requestSubmit();
        }

    }

    const handleSignUpSubmit = () => {

        if (signUpFormRef.current) {
            signUpFormRef.current.requestSubmit();
        }

    }

    const handleUserData = (event) => {
        const {name, value} = event.target;
        setUserData(data => ({...data, [name]: value}));
    }

    const handleSignIn = (event) => {
        event.preventDefault();
        console.log(userData);
        // const formData = new FormData(event.target);
        // const username = formData.get("username");
        // const password = formData.get("password");
        // const role = formData.get("role");

        // const jsonBody = {username:username, password:password, role:role};

        // console.log(jsonBody);

        const fetchToken = async () => {
            // console.log("working fetch");
            try {
                const response = await fetch ("http://localhost:8080/user/sign-in", 
                    {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(userData)
                    }
                );

                if (response.ok) {
                    const data = await response.text();
                    console.log(data);
                    localStorage.setItem("token", data);
                    alert("sign in successful");
                    navigate("/")
                } else {
                    // console.log("server not working")
                    alert("sign in unsuccessful try again")
                }
            } catch (error) {
                alert(`Backend Not Found....${error}`);
            }
        }

        fetchToken();
        
    }

    const handleSignUp = (event) => {
        event.preventDefault();
        console.log(userData);
        const formData = new FormData(event.target);
        const confirmPassword = formData.get("confirm-password");

        if (userData.password !== confirmPassword) {
            alert("password do not matched");
            return ;
        }

        // const jsonBody = {username: username, password: password, role: role};

        // console.log(jsonBody);

        const fetchSave = async () => {
            try {
                const response = await fetch("http://localhost:8080/user/sign-up",
                    {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(userData)
                    }
                );

                if (response.ok) {
                    const data = await response.text();
                    alert(data);
                    setIsSignIn(true);
                    // console.log(data);
                } else {
                    alert("Sign in error")
                }
            } catch (error) {
                alert(`Backend is not connected.....${error}`)
            }

        }

        fetchSave();
    }

    // useEffect(
    //     () => {
    //         gsap.to(signInDivRef.current, {x: 0, ease: "power2.out"})
    //         gsap.to(signInBackgroundImage.current, {x: 0, ease: "power2.out"})
    //     },
    // []);

    // useEffect(
    //     () => {
    //         if (signUp) {
    //             gsap.to(signUpDivRef.current,{x: "-160%", ease: "power2.out"})
    //             gsap.to(signUpBackgroundImage.current,{x: "71%", ease: "power2.out"})
    //         } else {
    //             gsap.to(signInDivRef.current, {x: 0, ease: "power2.out"})
    //             gsap.to(signInBackgroundImage.current, {x: 0, ease: "power2.out"})
    //         }
    //     }
    // , [signUp]);
    const handleEyeToggling = (event) => {
        
        if (event === 0) {
            setIsPasswordSignIn(!isPasswordSignIn);
        } else if (event === 1) {
            setIsPasswordSignUp([!isPasswordSignUp[0], isPasswordSignUp[1]]);
        } else {
            setIsPasswordSignUp([isPasswordSignUp[0], !isPasswordSignUp[1]]);
        }

    }

    return (
        <section className="flex items-center justify-center h-screen w-screen 
            bg-[url('./components/assets/background.png')] bg-cover">
            
            <div
                className="rounded-3xl bg-white/15 border border-white/30 backdrop-blur-lg shadow-xl 
                    p-5 w-[70%] h-[80%] relative overflow-hidden"
            >
                <div
                    className={`p-5 absolute inset-0 flex flex-row items-center gap-5 transition-transform duration-500 ease-in-out ${
                        isSignIn ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    <img src={SignInBackground} alt="hotel image" className="rounded-3xl w-[50%] h-[100%] object-cover" />
                    <div
                        className="rounded-3xl bg-white/15 border border-white/30 backdrop-blur-lg shadow-xl
                            p-5 w-[60%] h-[100%]"
                    >
                        <div
                            className="m-5 flex justify-center"
                        >
                            <h2 
                                className="text-amber-600 text-3xl font-bold"
                            >
                                Sign-In
                            </h2>
                        </div>
                        <form ref={signInFormRef} onSubmit={handleSignIn}>
                            <div
                                className="m-5"
                            >
                                <h2 className="pl-3 text-amber-600 text-lg font-bold">Username</h2>
                                <input
                                    value={userData.username}
                                    type="text"
                                    name="username"
                                    placeholder="--username--"
                                    onChange={handleUserData}
                                    required
                                    className="p-3 rounded-3xl w-[100%] bg-white/15 backdrop-blur-lg transition duration-300 ease-in-out
                                        border border-white/30 shadow-xl focus:outline-none focus:ring-1 focus:border-amber-600/30
                                        focus:ring-amber-600/30 hover:bg-amber-600/20 text-lg font-bold text-amber-600"
                                />
                            </div>
                            <div
                                className="m-5"
                            >
                                <h2 className="pl-3 text-amber-600 text-lg font-bold">Password</h2>
                                <div className="flex flex-row">
                                    <input
                                        value={userData.password}
                                        type={isPasswordSignIn? "text" : "password"}
                                        name="password"
                                        placeholder="--password--"
                                        onChange={handleUserData}
                                        required
                                        className="p-3 rounded-tl-3xl rounded-bl-3xl w-[90%] bg-white/15 backdrop-blur-lg
                                            border border-white/30 shadow-xl focus:outline-none focus:ring-1 focus:border-amber-600/30
                                           focus:ring-amber-600/30 hover:bg-amber-600/20 text-lg font-bold text-amber-600 transition duration-300 ease-in-out"
                                    />
                                    <a
                                        onClick={() => handleEyeToggling(0)}
                                        className="p-3 rounded-tr-3xl rounded-br-3xl w-[10%] bg-white/15 backdrop-blur-lg flex items-center justify-center
                                            border border-white/30 shadow-xl focus:outline-none focus:ring-1 focus:border-amber-600/30
                                         focus:ring-amber-600/30 hover:bg-amber-600/20 text-lg font-bold text-amber-600 transition duration-300 ease-in-out"
                                    >
                                        <img src={isPasswordSignIn? Invisible : Visible} alt="eye" className="w-[80%] h-[90%] object-cover"/>
                                    </a>
                                </div>
                            </div>
                            <div className="m-5">
                                <h2 className="pl-3 text-amber-600 text-lg font-bold">Role</h2>
                                <select 
                                    name="role"
                                    onChange={handleUserData}
                                    className="p-3 rounded-3xl w-[100%] bg-white/15 backdrop-blur-lg transition duration-300 ease-in-out
                                        border border-white/30 shadow-xl focus:outline-none focus:ring-1 focus:border-amber-600/30
                                     focus:ring-amber-600/30 hover:bg-amber-600/20 text-lg font-bold text-amber-600"
                                >
                                    <option value="">--Select Role--</option>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </form>
                    
                        <div
                            className="m-10"
                        >
                            <div className="flex flex-row gap-10">
                                <a
                                    onClick={handleSignInSubmit}
                                    className="p-3 rounded-3xl w-[50%] bg-green-500/15 backdrop-blur-lg flex items-center justify-center
                                        border border-green-500/30 shadow-xl focus:outline-none focus:ring-1 focus:border-green-600/30
                                        focus:ring-green-600/30 hover:bg-green-600/20 transition duration-300 ease-in-out cursor-pointer"
                                >
                                    <span className="text-lg font-bold text-green-600">Sign in</span>
                                </a>
                                <a
                                    onClick={() => {navigate("/")}}
                                    className="p-3 rounded-3xl w-[50%] bg-yellow-500/15 backdrop-blur-lg flex items-center justify-center
                                        border border-yellow-500/30 shadow-xl focus:outline-none focus:ring-1 focus:yellow-green-600/30
                                     focus:ring-yellow-600/30 hover:bg-yellow-600/20 transition duration-300 ease-in-out
                                        cursor-pointer"
                                >
                                    <span className="text-lg font-bold text-yellow-600">Home</span>
                                </a>
                            </div>
                            <div className="flex flex-row gap-1 m-5 justify-center">
                                <p className="text-lg font-bold text-amber-600 cursor-default">Do not have account? </p>
                                <span 
                                    onClick={() => {setIsSignIn(false)}}
                                    className="text-lg font-bold text-amber-600 cursor-pointer hover:text-amber-800
                                        transition duration-300 ease-in-out"
                                >
                                    sign-up
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`p-5 absolute inset-0 flex flex-row items-center gap-5 transition-transform duration-500 ease-in-out ${
                        isSignIn ? "translate-x-full" : "translate-x-0"}`}
                >
                    <div
                        className="rounded-3xl bg-white/15 border border-white/30 backdrop-blur-lg shadow-xl
                            p-5 w-[60%] h-[100%]"
                    >
                        <div
                            className="m-3 flex justify-center"
                        >
                            <h2 
                                className="text-amber-600 text-3xl font-bold"
                            >
                                Sign-Up
                            </h2>
                        </div>
                        <form ref={signUpFormRef} onSubmit={handleSignUp}>
                            <div
                                className="m-3"
                            >
                                <h2 className="pl-3 text-amber-600 text-lg font-bold">Username</h2>
                                <input
                                    value={userData.username}
                                    type="text"
                                    name="username"
                                    placeholder="--username--"
                                    onChange={handleUserData}
                                    required
                                    className="p-3 rounded-3xl w-[100%] bg-white/15 backdrop-blur-lg transition duration-300 ease-in-out
                                        border border-white/30 shadow-xl focus:outline-none focus:ring-1 focus:border-amber-600/30
                                        focus:ring-amber-600/30 hover:bg-amber-600/20 text-lg font-bold text-amber-600"
                                />
                            </div>
                            <div
                                className="m-3"
                            >
                                <h2 className="pl-3 text-amber-600 text-lg font-bold">Password</h2>
                                <div className="flex flex-row">
                                    <input
                                        value={userData.password}
                                        type={isPasswordSignUp[0]? "text" : "password"}
                                        name="password"
                                        placeholder="--password--"
                                        onChange={handleUserData}
                                        required
                                        className="p-3 rounded-tl-3xl rounded-bl-3xl w-[90%] bg-white/15 backdrop-blur-lg
                                            border border-white/30 shadow-xl focus:outline-none focus:ring-1 focus:border-amber-600/30
                                            focus:ring-amber-600/30 hover:bg-amber-600/20 text-lg font-bold text-amber-600 transition duration-300 ease-in-out"
                                    />
                                    <a
                                        onClick={() => handleEyeToggling(1)}
                                        className="p-3 rounded-tr-3xl rounded-br-3xl w-[10%] bg-white/15 backdrop-blur-lg flex items-center justify-center
                                            border border-white/30 shadow-xl focus:outline-none focus:ring-1 focus:border-amber-600/30
                                            focus:ring-amber-600/30 hover:bg-amber-600/20 text-lg font-bold text-amber-600 transition duration-300 ease-in-out"
                                    >
                                        <img src={isPasswordSignUp[0]? Invisible : Visible} alt="eye" className="w-[80%] h-[90%] object-cover"/>
                                    </a>
                                </div>
                            </div>
                            <div
                                className="m-3"
                            >
                                <h2 className="pl-3 text-amber-600 text-lg font-bold">Confirm Password</h2>
                                <div className="flex flex-row">
                                    <input
                                        // value={userData.password}
                                        type={isPasswordSignUp[1]? "text" : "password"}
                                        name="confirm-password"
                                        placeholder="--confirm password--"
                                        // onChange={handleUserData}
                                        required
                                        className="p-3 rounded-tl-3xl rounded-bl-3xl w-[90%] bg-white/15 backdrop-blur-lg
                                            border border-white/30 shadow-xl focus:outline-none focus:ring-1 focus:border-amber-600/30
                                            focus:ring-amber-600/30 hover:bg-amber-600/20 text-lg font-bold text-amber-600 transition duration-300 ease-in-out"
                                    />
                                    <a
                                        onClick={() => handleEyeToggling(2)}
                                        className="p-3 rounded-tr-3xl rounded-br-3xl w-[10%] bg-white/15 backdrop-blur-lg flex items-center justify-center
                                            border border-white/30 shadow-xl focus:outline-none focus:ring-1 focus:border-amber-600/30
                                            focus:ring-amber-600/30 hover:bg-amber-600/20 text-lg font-bold text-amber-600 transition duration-300 ease-in-out"
                                    >
                                        <img src={isPasswordSignUp[1]? Invisible : Visible} alt="eye" className="w-[80%] h-[90%] object-cover"/>
                                    </a>
                                </div>
                            </div>
                            <div className="m-3">
                                <h2 className="pl-3 text-amber-600 text-lg font-bold">Role</h2>
                                <select 
                                    name="role"
                                    onChange={handleUserData}
                                    className="p-3 rounded-3xl w-[100%] bg-white/15 backdrop-blur-lg transition duration-300 ease-in-out
                                        border border-white/30 shadow-xl focus:outline-none focus:ring-1 focus:border-amber-600/30
                                        focus:ring-amber-600/30 hover:bg-amber-600/20 text-lg font-bold text-amber-600"
                                >
                                    <option value="">--Select Role--</option>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </form>
                        
                        <div
                            className="m-8"
                        >
                            <div className="flex flex-row gap-10">
                                <a
                                    onClick={handleSignUpSubmit}
                                    className="p-3 rounded-3xl w-[50%] bg-green-500/15 backdrop-blur-lg flex items-center justify-center
                                        border border-green-500/30 shadow-xl focus:outline-none focus:ring-1 focus:border-green-600/30
                                        focus:ring-green-600/30 hover:bg-green-600/20 transition duration-300 ease-in-out cursor-pointer"
                                >
                                    <span className="text-lg font-bold text-green-600">Sign Up</span>
                                </a>
                                <a
                                    onClick={() => {navigate("/")}}
                                    className="p-3 rounded-3xl w-[50%] bg-yellow-500/15 backdrop-blur-lg flex items-center justify-center
                                        border border-yellow-500/30 shadow-xl focus:outline-none focus:ring-1 focus:yellow-green-600/30
                                        focus:ring-yellow-600/30 hover:bg-yellow-600/20 transition duration-300 ease-in-out
                                        cursor-pointer"
                                >
                                    <span className="text-lg font-bold text-yellow-600">Home</span>
                                </a>
                            </div>
                                <div className="flex flex-row gap-1 m-3 justify-center">
                                <p className="text-lg font-bold text-amber-600 cursor-default">Do not have account? </p>
                                <span 
                                    onClick={() => {setIsSignIn(true)}}
                                    className="text-lg font-bold text-amber-600 cursor-pointer hover:text-amber-800
                                        transition duration-300 ease-in-out"
                                >
                                    sign-in
                                </span>
                            </div>
                        </div>
                    </div>
                    <img  src={SignUpBackground} alt="hotel image" className="rounded-3xl w-[50%] h-[100%] object-cover" />
                </div>
            </div>

        </section>
    );
}

export default SignInPage;