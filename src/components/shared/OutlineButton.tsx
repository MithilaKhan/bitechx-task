const OutlineButton = ({
    children,
    className,
    type,
    onClick
}: {
    children: React.ReactNode;
    className: string;
    type?: "submit" | "reset" | "button";
    onClick?: () => void;
}) => {
    return (
        <button
            className={`border border-b-[3px] border-primary  px-3 h-[45px] text-primary font-medium  text-sm lg:text-[16px]  rounded-lg  ${className}`}
            type={type || "button"}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default OutlineButton;