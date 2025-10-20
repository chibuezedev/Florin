import "./globals.css";
import { Poppins } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { BiometricProvider } from "@/context/BiometricProvider";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} dark`}>
      <body className="antialiased font-sans">
        <AuthProvider>
          <BiometricProvider>{children}</BiometricProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
