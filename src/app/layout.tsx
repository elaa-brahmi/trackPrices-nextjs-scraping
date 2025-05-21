import type { Metadata } from "next";
import {Inter } from "next/font/google";
import "./globals.css";
//import "@fontsource/inter"; // if installed locally

import Navbar from "../../components/Navbar";
const inter = Inter({
  subsets: ["latin"],
variable: "--font-inter"
}); //loads the Inter font from google fonts and return an object with the className property 
  //that can be used to apply the font to the body of the document
/* const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"] ,
  weight: ["300", "400", "500","600", "700"]

});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
}); */

export const metadata: Metadata = {
  title: "pricewise",
  description: "track product prices effortlessly and save money on your online shopping"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable}`}
      >
        <main className="max-w-10xl mx-auto">
        <Navbar />

       {children} 
       </main>
        
      </body>
    </html>
  );
}
