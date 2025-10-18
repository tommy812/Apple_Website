import React from 'react'
import NavBar from './components/NavBar.jsx'
import Hero from './components/Hero.jsx'
import ProductViewer from "./components/ProductViewer.jsx";
import {ScrollTrigger} from "gsap/all";
import gsap from "gsap";
import Showcase from "./components/Showcase.jsx";
import Features from "./components/Features.jsx";
import Footer from "./components/Footer.jsx";
import Performance from "./components/Performance.jsx";
import Highlight from "./components/Highlight.jsx";

gsap.registerPlugin(ScrollTrigger);
const App = () => {
    return (
        <main>
            <NavBar />
            <Hero />
            <ProductViewer />
            <Showcase />
            <Performance/>
            <Features />
            <Highlight />
            <Footer />
        </main>
    )
}
export default App
