import "./globals.css";
import AuthState from "../actions/apis";

export const metadata = {
  title: "Loan App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
          <AuthState>{children}</AuthState>
        </main>
      </body>
    </html>
  );
}
