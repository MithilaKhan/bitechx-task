const SubmitButton = ({
    children,
    className,
    type,
}: {
    children: React.ReactNode;
    className: string;
    type?: "submit" | "reset" | "button";
}) => {
    return (
        <button
            className={` h-[45px] w-full  rounded-lg bg-primary text-white font-normal text-sm md:text-[16px]   ${className}`}
            type={type || "button"}
        >
            {children}
        </button>
    );
};

export default SubmitButton;