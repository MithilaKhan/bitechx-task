import React from "react";
import LoginCard from "./LoginCard";

const Login = () => {

    return (
        <div className="flex-center relative h-screen w-full p-5 lg:p-0 bg-[#EFF1F3]">
            <div className="p-4">
                <div
                    className="shadow-xl lg:w-[570px] w-[350px]"
                    style={{
                        background: "#ffffff",
                        padding: 30,
                        borderRadius: 10,
                        position: "relative",
                        zIndex: 2,
                    }}
                >
                    <LoginCard />

                </div>
            </div>
        </div>
    );
};

export default Login;
