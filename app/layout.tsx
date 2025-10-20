import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { BiometricProvider } from "@/context/BiometricProvider";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <AuthProvider>
          <BiometricProvider>{children}</BiometricProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
