import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Achievements from "@/components/Achievements";
import GitHubActivity from "@/components/GitHubActivity";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <TechStack />
      <Achievements />
      <GitHubActivity />
      <Contact />
    </>
  );
}
