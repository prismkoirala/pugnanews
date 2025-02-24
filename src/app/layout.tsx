import "./globals.css"; // At the top of layout.tsx
import { ReactNode } from "react";
import NavHeader from "../components/Navheader";
import ClientLayout from "./client-layout";
import Footer from "@/components/Footer";

export const metadata = {
  title: "pugnanews - Get curated stories on what's happening right now",
  description: 'Stay informed with Pugna News - breaking news, curated stories, and updates on what’s happening now.',
  keywords: 'next.js, react, javascript, news, breaking news, USA',
  openGraph: {
    title: "Pugna News - Get curated stories on what's happening right now",
    description: 'Stay informed with Pugna News - breaking news, curated stories, and updates on what’s happening now.',
    url: 'https://pugnanews.com',
    images: [
      {
        url: 'https://pugnanews.com/og-image.jpg',
        width: 800,
        height: 600,
        alt: 'Open Graph Image',
      },
    ],
  },
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <ClientLayout>
          <NavHeader />
          {children}
          <Footer/>
        </ClientLayout>
      </body>
    </html>
  );
}