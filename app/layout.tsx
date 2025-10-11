import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { BiometricProvider } from "@/context/biometricProvider";

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
        </AuthProvider>
      </body>
    </html>
  );
}
