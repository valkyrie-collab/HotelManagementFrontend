import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {gsap} from "gsap"
import SignInBackground from "./assets/SignInBackground.PNG"
import SignUpBackground from "./assets/SignUpBackground.PNG"

function SignInPage() {
    const [signUp, setSignUp] = useState(false);
    const signInFormRef = useRef(null);
    const signUpFormRef = useRef(null);
    const signInDivRef = useRef(null);
    const signUpDivRef = useRef(null);
    const signUpBackgroundImage = useRef(null);
    const signInBackgroundImage = useRef(null);
    const navigate = useNavigate();
    // useEffect(
    //     () => {
    //         console.log(signUp);
    //     },
    // [signUp])

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

    const handleSignIn = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get("username");
        const password = formData.get("password");
        const role = formData.get("role");

        const jsonBody = {username:username, password:password, role:role};

        // console.log(jsonBody);

        const fetchToken = async () => {
            // console.log("working fetch");
            const response = await fetch ("http://localhost:8080/user/sign-in", 
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(jsonBody)
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

        }

        fetchToken();
        
    }

    const handleSignUp = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get("username");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirm-password");
        const role = formData.get("role");

        if (password !== confirmPassword) {
            alert("password do not matched");
            return ;
        }

        const jsonBody = {username: username, password: password, role: role};

        // console.log(jsonBody);

        const fetchSave = async () => {
            const response = await fetch("http://localhost:8080/user/sign-up",
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(jsonBody)
                }
            );

            if (response.ok) {
                const data = await response.text();
                alert(data);
                // console.log(data);
            } else {
                alert("Sign in error")
            }

        }

        fetchSave();
    }

    useEffect(
        () => {
            gsap.to(signInDivRef.current, {x: 0, ease: "power2.out"})
            gsap.to(signInBackgroundImage.current, {x: 0, ease: "power2.out"})
        },
    []);

    useEffect(
        () => {
            if (signUp) {
                gsap.to(signUpDivRef.current,{x: "-160%", ease: "power2.out"})
                gsap.to(signUpBackgroundImage.current,{x: "71%", ease: "power2.out"})
            } else {
                gsap.to(signInDivRef.current, {x: 0, ease: "power2.out"})
                gsap.to(signInBackgroundImage.current, {x: 0, ease: "power2.out"})
            }
        }
    , [signUp]);

    return (
        <section className="flex items-center justify-center h-screen w-screen 
            bg-[url('./components/assets/background.png')] bg-cover">
            
            <div className="rounded-2xl bg-white/15 backdrop-blur-lg border 
                border-white/30 shadow-xl h-[75%] w-[50%] p-5 flex items-center ">
                {signUp? (
                    //This div below contains Sign Up
                    <div className="flex flex-row items-center justify-center">

                        <div ref={signUpBackgroundImage} className=" relative ">
                            <img 
                                src={SignUpBackground} 
                                className="w-[92%] rounded-xl" 
                            />
                        </div>

                        <div ref={signUpDivRef} className="rounded-2xl bg-white/15 backdrop-blur-lg border relative
                            border-white/30 shadow-xl pl-5 pr-8 pt-6 pb-9 flex flex-col items-center">
                                
                            <h2 className="text-amber-600 text-2xl pb-5 font-bold text-center">Sign-in</h2>
                            
                            <form ref={signUpFormRef} onSubmit={handleSignUp}>

                                <input 
                                    type="text" 
                                    name="username" 
                                    placeholder="Username" 
                                    required
                                    className="w-70 ml-5 p-2 border border-amber-600 rounded-lg placeholder:text-black/35 
                                    transition ease-in-out duration-300 text-amber-600
                                    focus:outline-none focus:ring-1 focus:ring-amber-600 hover:backdrop-blur-lg mb-5" />
                            
                                <input 
                                    type="text" 
                                    name="password" 
                                    placeholder="Password" 
                                    required
                                    className="w-70 ml-5 p-2 border border-amber-600 rounded-lg placeholder:text-black/35 text-amber-600
                                    focus:outline-none focus:ring-1 focus:ring-amber-600 hover:backdrop-blur-lg transition ease-in-out duration-300" />

                                <input 
                                    type="text" 
                                    name="confirm-password" 
                                    placeholder="Confirm-Password" 
                                    required
                                    className="w-70 ml-5 mt-5 p-2 border border-amber-600 rounded-lg placeholder:text-black/35 text-amber-600
                                    focus:outline-none focus:ring-1 focus:ring-amber-600 hover:backdrop-blur-lg transition ease-in-out duration-300" />

                                <select
                                    name="role"
                                    className="w-70 ml-5 p-2 border border-amber-600 rounded-lg placeholder:text-black/35 
                                    transition ease-in-out duration-300 text-amber-600
                                    focus:outline-none focus:ring-1 focus:ring-amber-600 hover:backdrop-blur-lg mt-5">
                                        <option value="">--Select-Option--</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                </select>

                                <a 
                                    onClick={handleSignUpSubmit}
                                    className="rounded-2xl bg-white/15 backdrop-blur-lg border 
                                        transition ease-in-out duration-300 hover:bg-amber-700/30 cursor-pointer
                                        border-white/30 ml-5 pt-0.5 pb-0.5 mt-5 flex items-center justify-center"
                                >
                                    <span className="text-amber-600 font-bold text-center">Sign-up</span>
                                </a>

                            </form>

                            <p className="text-amber-700 ml-2 pt-2 pb-1 max-w-[100%]">Do not have account 
                                <a onClick={() => setSignUp(!signUp)}> 
                                    <span className="text-amber-700 hover:text-amber-900 cursor-pointer"> Sign-in</span>
                                </a> 
                            </p>

                        </div>
                        
                    </div>
                ) : (
                    // This div (below) contains Sign In 
                    <div className="flex flex-row items-center justify-center">
                        <div ref={signInBackgroundImage} className=" relative ">
                            <img 
                                src={SignInBackground} 
                                className="w-[87%] rounded-xl" 
                            />
                        </div>

                        <div ref={signInDivRef} className="rounded-2xl bg-white/15 backdrop-blur-lg border relative
                            border-white/30 shadow-xl pl-5 pr-8 pt-8 pb-11 flex flex-col items-center">
                                
                            <h2 className="text-amber-600 text-2xl pb-5 font-bold text-center">Sign-in</h2>
                            
                            <form ref={signInFormRef} onSubmit={handleSignIn}>

                                <input 
                                    type="text" 
                                    name="username" 
                                    placeholder="Username" 
                                    required
                                    className="max-w-[100%] ml-5 p-2 border border-amber-600 rounded-lg placeholder:text-black/35 
                                    transition ease-in-out duration-300 text-amber-600
                                    focus:outline-none focus:ring-1 focus:ring-amber-600 hover:backdrop-blur-lg mb-5" />
                            
                                <input 
                                    type="text" 
                                    name="password" 
                                    placeholder="Password" 
                                    required
                                    className="max-w-[100%] ml-5 p-2 border border-amber-600 rounded-lg placeholder:text-black/35 text-amber-600
                                    focus:outline-none focus:ring-1 focus:ring-amber-600 hover:backdrop-blur-lg transition ease-in-out duration-300" />

                                <select
                                    name="role"
                                    className="max-w-[100%] ml-5 p-2 border border-amber-600 rounded-lg placeholder:text-black/25
                                    transition ease-in-out duration-300 
                                    focus:outline-none focus:ring-1 focus:ring-amber-600 hover:backdrop-blur-lg text-amber-600 mt-5">
                                        <option value="">--Select-Option--</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                </select>

                                <a 
                                    onClick={handleSignInSubmit}
                                    className="rounded-2xl bg-white/15 backdrop-blur-lg border 
                                        transition ease-in-out duration-300 hover:bg-amber-700/30 cursor-pointer
                                        border-white/30 ml-5 pt-0.5 pb-0.5 mt-5 flex items-center justify-center"
                                >
                                    <span className="text-amber-600 font-bold text-center">Sign-in</span>
                                </a>

                            </form>

                            <p className="text-amber-700 ml-2 pt-2 pb-1 max-w-[100%]">Do not have account 
                                <a onClick={() => setSignUp(!signUp)}> 
                                    <span className="text-amber-700 hover:text-amber-900 cursor-pointer"> Sign-up</span>
                                </a> 
                            </p>

                        </div>
                        
                    </div>
                )}

            </div>

        </section>
    );
}

export default SignInPage;