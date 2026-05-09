import "./globals.css";

export const metadata = {
  title: "Social Media Platform Dashboard",
  description: "Manage Facebook, Instagram, and TikTok workspaces from one dashboard"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
