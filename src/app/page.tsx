import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import WhyChooseUs from "@/components/WhyChooseUs";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex-1 w-full" id="content">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Experience />
        <WhyChooseUs />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
