"use client";
import React, { useEffect } from 'react';
import SubmitButton from "@/components/shared/SubmitButton";
import { Form } from 'antd';
import TextInput from "@/components/shared/TextInput";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import Cookies from 'js-cookie';
import { errorType } from "@/types/type";


const LoginCard = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const [loginUser, { isLoading, isSuccess, isError, error, data }] = useLoginUserMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Login successful");
            Cookies.set("accessToken", data?.token || "");
            form.resetFields();
            setTimeout(() => {
                router.push("/");
            }, 200);
        }

        if (isError) {
            const errorMessage = (error as errorType)?.data?.message || "Something went wrong";
            toast.error(errorMessage);
        }
    }, [isSuccess, isError, error, data, router, form]);

    const onFinish = async (values: { email: string, password: string }) => {
        await loginUser(values)
    };

    return (
        <div>
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
                            {isLoading ? "Signing..." : "Sign in"}

                        </SubmitButton>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default LoginCard;