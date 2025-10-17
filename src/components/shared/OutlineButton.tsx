const OutlineButton = ({
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
            className={`border border-b-[3px] border-primary  px-3 h-[45px] text-primary font-medium  text-sm lg:text-[16px]  rounded-lg  ${className}`}
            type={type || "button"}
        >
            {children}
        </button>
    );
};

export default OutlineButton;