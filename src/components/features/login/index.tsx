"use client";

import React from "react";
import { Form } from "antd";
import TextInput from "@/components/shared/TextInput";
import OutlineButton from "@/components/shared/OutlineButton";
import SubmitButton from "@/components/shared/SubmitButton";
import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";

const Login = () => {
    const [form] = Form.useForm(); 
    const router = useRouter();

    const onFinish = (values: any) => {
        console.log("Success:", values);
    };

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
                    <button
                        onClick={() => router.back()}
                        className="absolute left-5 top-5 flex items-center gap-1 text-primary transition hover:text-primary "
                    >
                        <HiArrowLeft />
                        <span className="text-sm font-medium">Back</span>
                    </button> 

                    <div className=" mt-5 lg:mt-8">
                        <div className="mb-6">
                            <h1 className="mb-2 text-[23px] font-medium">
                                Log in to your account
                            </h1>
                        </div>

                        <Form form={form} layout="vertical" onFinish={onFinish}>
                            <TextInput name="email" label="Email" />

                            <Form.Item className="mt-4 md:mt-5">
                                <SubmitButton
                                    type="submit"
                                    className=""
                                >
                                    {/* {isLoading ? "Signing..." : "Sign in"} */}
                                    Sign in
                                </SubmitButton>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
