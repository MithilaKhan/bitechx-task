import { Poppins } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ReduxProvider from "@/redux/lib/ReduxProvider";
import { ToastContainer } from "react-toastify";
import { ConfigProvider } from "antd";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} `}>
        <ReduxProvider>
          <AntdRegistry  >
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#A44A3F10',
                },
                components: {
                  Input: {
                    borderRadius: 5,
                  },
                },
              }}
            >

              <ToastContainer position="top-right" autoClose={1500}
                toastClassName={"bg-white text-black shadow-md rounded-md p-4 text-sm sm:text-base w-[90%] sm:w-[450px] lg:w-[600px] mx-auto"}
              />
              {children}
            </ConfigProvider>
          </AntdRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
