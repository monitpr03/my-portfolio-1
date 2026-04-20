/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Text, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "motion/react";
import * as THREE from "three";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  ArrowRight,
  ChevronLeft,
  Layout, 
  Box, 
  PenTool, 
  Layers, 
  Home,
  ExternalLink,
  Menu,
  X,
  Send
} from "lucide-react";

// --- Three.js Components ---

const ArchitecturalElement = ({ position, rotation, scale, color }: any) => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={position} rotation={rotation} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} wireframe opacity={0.3} transparent />
      </mesh>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <ArchitecturalElement position={[-4, 2, -5]} rotation={[0.5, 0.5, 0]} scale={[2, 4, 0.5]} color="#567C8D" />
      <ArchitecturalElement position={[4, -2, -8]} rotation={[0, 0.2, 0.5]} scale={[3, 0.5, 3]} color="#2F4156" />
      <ArchitecturalElement position={[0, 5, -10]} rotation={[0.8, 0, 0.2]} scale={[5, 0.2, 5]} color="#C8D9E6" />
      <mesh position={[0, 0, -15]}>
        <sphereGeometry args={[10, 32, 32]} />
        <MeshDistortMaterial color="#C8D9E6" speed={2} distort={0.3} radius={1} opacity={0.1} transparent />
      </mesh>
    </>
  );
};

// --- UI Components ---

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-16"
  >
    <p className="text-teal uppercase tracking-[0.3em] text-xs font-bold mb-2">{subtitle}</p>
    <h2 className="text-5xl md:text-7xl font-serif text-navy leading-none">{title}</h2>
    <div className="w-24 h-1 bg-teal mt-6" />
  </motion.div>
);

const ProjectModal = ({ project, isOpen, onClose }: { project: any; isOpen: boolean; onClose: () => void }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-navy/95 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-navy rounded-[3rem] shadow-2xl overflow-hidden"
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover opacity-50 image-render-4k"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-navy/95 via-navy/60 to-navy/95" />
            </div>

            <button 
              onClick={onClose}
              className="fixed top-6 right-6 md:top-10 md:right-10 z-[110] p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-teal hover:text-white transition-all shadow-lg group border border-white/10"
            >
              <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
            </button>

            <div className="relative z-10 min-h-[60vh] flex flex-col justify-center">
              <div className="p-8 md:p-16 mb-0">
                <div className="mb-12">
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-teal font-black tracking-[0.4em] uppercase text-xs mb-4"
                  >
                    {project.category}
                  </motion.p>
                  <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-5xl md:text-8xl font-serif text-white mb-8 leading-tight"
                  >
                    {project.title}
                  </motion.h2>
                  <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="w-24 h-1 bg-teal mb-12"
                  />
                  <motion.p 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl md:text-2xl text-white/80 max-w-3xl leading-relaxed font-light"
                  >
                    {project.desc}
                  </motion.p>
                </div>
              </div>

              <div className="w-full">
                {project.details.map((img: string, idx: number) => (
                  <div key={idx} className={(project.id === 'neerangan' || project.id === 'punarsutra') ? "mb-12 md:mb-32" : ""}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="w-full"
                    >
                      <img 
                        src={img} 
                        alt={`${project.title} detail ${idx + 1}`} 
                        className="w-full h-auto block image-render-4k shadow-[0_0_50px_rgba(0,0,0,0.3)]"
                        referrerPolicy="no-referrer"
                        loading="eager"
                        decoding="async"
                      />
                    </motion.div>

                    {project.id === 'punarsutra' && idx === 1 && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="py-10 text-center bg-navy/40 border-b border-white/10"
                      >
                        <h4 className="text-white font-serif italic text-3xl md:text-5xl tracking-tight">SECTION AA'</h4>
                        <div className="w-16 h-px bg-teal mx-auto mt-6 opacity-50" />
                      </motion.div>
                    )}

                    {project.id === 'punarsutra' && idx === 2 && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="py-10 text-center bg-navy/40 border-b border-white/10"
                      >
                        <h4 className="text-white font-serif italic text-3xl md:text-5xl tracking-tight">SECTION BB'</h4>
                        <div className="w-16 h-px bg-teal mx-auto mt-6 opacity-50" />
                      </motion.div>
                    )}

                    {project.id === 'vastaangan' && idx === 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-8 md:p-20 bg-navy/80 text-white border-y border-white/10"
                      >
                        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                          <div>
                            <h3 className="text-teal font-black tracking-[0.4em] uppercase text-[10px] mb-8 opacity-80 italic">{"// LEGENDS"}</h3>
                            <ul className="grid grid-cols-1 gap-3 font-serif italic text-xl md:text-2xl text-white/90">
                              <li className="flex gap-4"><span className="text-teal font-sans not-italic text-sm mt-1">01</span> PARKING</li>
                              <li className="flex gap-4"><span className="text-teal font-sans not-italic text-sm mt-1">02</span> SITTING AREA</li>
                              <li className="flex gap-4"><span className="text-teal font-sans not-italic text-sm mt-1">03</span> SHOP</li>
                              <li className="flex gap-4"><span className="text-teal font-sans not-italic text-sm mt-1">04</span> WORK SPACE</li>
                              <li className="flex gap-4"><span className="text-teal font-sans not-italic text-sm mt-1">05</span> LECTURE ROOM</li>
                              <li className="flex gap-4"><span className="text-teal font-sans not-italic text-sm mt-1">06</span> HANDS ON EXP. AREA</li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-teal font-black tracking-[0.4em] uppercase text-[10px] mb-8 opacity-80 italic">{"// HOUSING"}</h3>
                            <ul className="grid grid-cols-1 gap-3 font-serif italic text-xl md:text-2xl text-white/90">
                              <li className="flex gap-4"><span className="text-teal font-sans not-italic text-sm mt-1">07</span> LIVING AREA</li>
                              <li className="flex gap-4"><span className="text-teal font-sans not-italic text-sm mt-1">08</span> KITCHEN</li>
                              <li className="flex gap-4"><span className="text-teal font-sans not-italic text-sm mt-1">09</span> STORAGE</li>
                              <li className="flex gap-4"><span className="text-teal font-sans not-italic text-sm mt-1">10</span> BATHROOM</li>
                              <li className="flex gap-4"><span className="text-teal font-sans not-italic text-sm mt-1">11</span> BEDROOM</li>
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {project.id === 'punarsutra' && idx === 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-8 md:p-20 bg-navy/80 text-white border-y border-white/10"
                      >
                        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                          <div>
                            <h3 className="text-teal font-black tracking-[0.4em] uppercase text-[10px] mb-8 opacity-80 italic">{"// LEGENDS"}</h3>
                            <ul className="grid grid-cols-1 gap-4 font-serif italic text-xl md:text-2xl text-white/90">
                              <li className="flex gap-4 items-start"><span className="text-teal font-sans not-italic text-sm mt-1 w-8">01</span> Admin block</li>
                              <li className="flex gap-4 items-start"><span className="text-teal font-sans not-italic text-sm mt-1 w-8">02,03</span> Seminar hall</li>
                              <li className="flex gap-4 items-start"><span className="text-teal font-sans not-italic text-sm mt-1 w-8">04,05</span> Classrooms</li>
                              <li className="flex gap-4 items-start"><span className="text-teal font-sans not-italic text-sm mt-1 w-8">06</span> Library</li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-teal font-black tracking-[0.4em] uppercase text-[10px] mb-8 opacity-0 italic">{"// CONT."}</h3>
                            <ul className="grid grid-cols-1 gap-4 font-serif italic text-xl md:text-2xl text-white/90">
                              <li className="flex gap-4 items-start"><span className="text-teal font-sans not-italic text-sm mt-1 w-8">07</span> Amphitheatre</li>
                              <li className="flex gap-4 items-start"><span className="text-teal font-sans not-italic text-sm mt-1 w-8">08</span> Cafeteria</li>
                              <li className="flex gap-4 items-start"><span className="text-teal font-sans not-italic text-sm mt-1 w-8">09</span> Dormitory</li>
                              <li className="flex gap-4 items-start"><span className="text-teal font-sans not-italic text-sm mt-1 w-8">10</span> Parking</li>
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {project.id === 'neerangan' && idx === 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-8 md:p-20 bg-navy/80 text-white border-y border-white/10 my-12"
                      >
                        <div className="max-w-4xl mx-auto">
                          <h3 className="text-teal font-black tracking-[0.4em] uppercase text-[10px] mb-12 opacity-80 italic text-center">{"// PROJECT LEGENDS"}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="flex flex-col items-center text-center">
                              <span className="text-teal font-sans text-4xl mb-4">01</span>
                              <p className="font-serif italic text-2xl">CAFETERIA</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                              <span className="text-teal font-sans text-4xl mb-4">02</span>
                              <p className="font-serif italic text-2xl">AMPHITHEATRE</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                              <span className="text-teal font-sans text-4xl mb-4">03</span>
                              <p className="font-serif italic text-2xl">POND</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                              <div className="w-12 h-12 mb-4 flex items-center justify-center">
                                <svg viewBox="0 0 100 100" className="w-full h-full text-teal fill-none stroke-current stroke-[4]">
                                  <path d="M50 5 L89 27.5 L89 72.5 L50 95 L11 72.5 L11 27.5 Z" />
                                  <path d="M50 20 L75 35 L75 65 L50 80 L25 65 L25 35 Z" opacity="0.5" />
                                </svg>
                              </div>
                              <p className="font-serif italic text-2xl">GAZEBO</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-8 md:p-16 mt-0 flex justify-center">
                <button 
                  onClick={onClose}
                  className="flex items-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full hover:bg-teal hover:border-teal transition-all group"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Back to Portfolio
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const projects = [
    {
      id: "geonest",
      title: "GEONEST PAVILION",
      category: "Pavilion / Installation",
      desc: "Formed through a network of interlocking triangles, the pavilion acts as both structure and skin. Its faceted geometry captures shifting light conditions, creating an ever-changing interior atmosphere. The design frames moments of rest and interaction, offering a quiet yet immersive spatial experience",
      image: "https://i.postimg.cc/g0fDtNhw/Whats-App-Image-2026-03-16-at-8-20-37-AM.jpg",
      details: [
        "https://www.image2url.com/r2/default/images/1776623565710-19e15333-6911-44d6-b3fb-cd2ece04bdee.png",
        "https://www.image2url.com/r2/default/images/1776625117170-c6ab96ed-7c58-43fd-b435-adfeaad24269.png",
        "https://www.image2url.com/r2/default/images/1776623330163-a9a23278-0b1b-4845-8727-5fb71389b051.png",
        "https://www.image2url.com/r2/default/images/1776624435837-06a4bcfe-20f7-4de9-a0ba-45c2cc4fbdc3.png",
        "https://www.image2url.com/r2/default/images/1776624559714-37069989-daef-4932-b184-37a9c4ed020f.png"
      ]
    },
    {
      id: "vastaangan",
      title: "VastaAngan",
      category: "Residential / Courtyard",
      desc: "Vastraangan is a contemporary tribute to vernacular craft, integrating education and retail into a unified platform for cultural preservation. The project fosters direct engagement between local artisans and a global audience, sustaining traditional knowledge through meaningful exchange.",
      image: "https://image2url.com/r2/default/images/1774241654818-80da3f78-2fb6-4e2c-80ba-9802450570f1.jpg",
      details: [
        "https://www.image2url.com/r2/default/images/1776626945562-cf547916-7866-49b0-a607-80e99c04fcdc.png",
        "https://i.freeimage.host/Bgr3D3N.png",
        "https://www.image2url.com/r2/default/images/1776627139562-48cc59d2-408a-4175-a0e5-998b127409af.png",
        "https://www.image2url.com/r2/default/images/1776627277901-5a7c134f-b2cd-45bb-b619-96fd96b5297a.png",
        "https://www.image2url.com/r2/default/images/1776627435738-a40280d8-1b32-4b73-a246-16cac258da10.png"
      ]
    },
    {
      id: "neerangan",
      title: "NeerAngan",
      category: "Waterfront / Landscape",
      desc: "A thoughtfully articulated landscape that integrates flowing pathways, a central water body, and layered vegetation to create a calm, immersive environment. The design encourages movement, pause, and interaction, fostering a seamless connection between people and nature.",
      image: "https://image2url.com/r2/default/images/1774241937657-a29eeba6-8cc8-4716-987c-04913a32855c.png",
      details: [
        "https://www.image2url.com/r2/default/images/1776649291823-b3cc94c0-ee71-4d75-a394-d03574209542.png",
        "https://www.image2url.com/r2/default/images/1776647604002-d73c395d-ef78-4f70-a1f1-2774bbe392aa.png",
        "https://www.image2url.com/r2/default/images/1776647637942-84831baa-ef2e-419f-a3f0-159783d8089f.png",
        "https://www.image2url.com/r2/default/images/1776647558660-8417fbc0-2563-421b-b662-cef21dd9dcc0.png",
        "https://www.image2url.com/r2/default/images/1776647672927-e93249a6-1926-47de-85cc-fe554fb6aa0a.png"
      ]
    },
    {
      id: "punarsutra",
      title: "Punar-Sutra",
      category: "Adaptive Reuse / Cultural",
      desc: "A vernacular-inspired revival centre in Udvada that bridges traditional craft with contemporary life. The campus integrates artisan workshops and community spaces within a human-scaled, context-responsive environment, fostering cultural continuity.",
      image: "https://image2url.com/r2/default/images/1774242125591-4352caf1-67e9-46e1-a92e-89b0b72711d5.png",
      details: [
        "https://www.image2url.com/r2/default/images/1776650259817-6d70a0fa-e435-49d0-a53c-6c266c58d5ce.png",
        "https://www.image2url.com/r2/default/images/1776650599280-121be9cd-b068-494e-8155-5613e481b7b2.png",
        "https://www.image2url.com/r2/default/images/1776650561607-03b13d43-6771-4d20-9979-787beead48dd.png",
        "https://www.image2url.com/r2/default/images/1776650717468-c1b89368-16b5-4232-aaa2-0ebd0353545e.png",
        "https://www.image2url.com/r2/default/images/1776650779583-67461554-9020-4f3a-a0d5-8c53fe970aba.png"
      ]
    }
  ];

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    
    const whatsappMessage = `Hello Monit, I'm ${name} (${email}). %0A%0A${message}`;
    window.open(`https://wa.me/918799318544?text=${whatsappMessage}`, "_blank");
  };

  return (
    <div className="relative bg-white text-navy selection:bg-teal selection:text-white overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-teal z-[100] origin-left" style={{ scaleX }} />

      {/* 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <Scene />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-morphism border-b border-navy/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-serif font-black tracking-tighter text-navy"
          >
            M<span className="text-teal">.</span>P
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-10 text-xs uppercase tracking-[0.2em] font-bold">
            {['Home', 'Projects', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-teal transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a href="#contact" className="px-6 py-2.5 bg-navy text-white hover:bg-teal transition-all rounded-full">
              Hire Me
            </a>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-navy">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-8 text-2xl font-serif">
              {['Home', 'Projects', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-navy hover:text-teal">
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 architectural-grid z-0" />
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-teal uppercase tracking-[0.4em] text-sm font-black mb-6">Architecture Student</p>
              <h1 className="text-7xl md:text-9xl font-serif text-navy leading-[0.85] mb-8">
                MONIT <br />
                <span className="italic text-teal">PRAJAPATI</span>
              </h1>
              <p className="text-xl text-navy/60 max-w-lg mb-12 leading-relaxed font-medium">
                Designing the future through structural elegance and conceptual innovation. 
                Specializing in 3D visualization and spatial storytelling.
              </p>
              <div className="flex flex-wrap gap-6">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#projects"
                  className="px-10 py-5 bg-navy text-white rounded-full flex items-center gap-3 group font-bold tracking-widest text-xs uppercase"
                >
                  Explore Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact"
                  className="px-10 py-5 border-2 border-navy text-navy rounded-full flex items-center gap-3 hover:bg-navy hover:text-white transition-all font-bold tracking-widest text-xs uppercase"
                >
                  Contact Me <Mail className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:block"
            >
              <div className="aspect-[4/5] w-full max-w-md mx-auto rounded-[3rem] overflow-hidden border-[16px] border-white shadow-2xl relative group">
                <img 
                  src="https://image2url.com/r2/default/images/1771908810562-19d72d54-d1b6-43ac-9b92-b126d916b857.png" 
                  alt="Monit Prajapati" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100 image-render-4k"
                  referrerPolicy="no-referrer"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-navy/20 mix-blend-overlay" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal/10 rounded-full blur-3xl" />
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-sky/20 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 architectural-grid opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <p className="text-teal uppercase tracking-[0.4em] text-xs font-black mb-4">Portfolio</p>
            <h2 className="text-6xl md:text-8xl font-serif">PROJECTS</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative cursor-pointer"
                onClick={() => {
                  setSelectedProject(project);
                  setIsModalOpen(true);
                }}
              >
                <div className="aspect-[16/10] rounded-3xl overflow-hidden relative shadow-2xl">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 image-render-4k"
                    referrerPolicy="no-referrer"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                    <div className="text-center p-8 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-teal font-black tracking-widest uppercase text-xs mb-4">View Project</p>
                      <h3 className="text-4xl font-serif mb-4">{project.title}</h3>
                      <div className="w-12 h-1 bg-teal mx-auto" />
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-between items-end">
                  <div>
                    <p className="text-teal font-bold tracking-widest uppercase text-xs mb-2">{project.category}</p>
                    <h4 className="text-3xl font-serif">{project.title}</h4>
                  </div>
                  <div className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:bg-teal group-hover:border-teal transition-all">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionTitle title="Get In Touch" subtitle="Contact" />
              <p className="text-xl text-navy/60 mb-12 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
              
              <div className="space-y-10">
                {[
                  { icon: <Phone />, label: "Call", value: "8799318544" },
                  { icon: <Mail />, label: "Email", value: "monitpr03@gmail.com" },
                  { icon: <MapPin />, label: "Location", value: "Silvassa, DNH&DD" },
                  { icon: <Linkedin />, label: "LinkedIn", value: "monit-prajapati", link: "https://www.linkedin.com/in/monit-prajapati" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-8 group">
                    <div className="w-16 h-16 rounded-2xl bg-sky/20 flex items-center justify-center text-teal group-hover:bg-teal group-hover:text-white transition-all duration-500 shadow-sm">
                      {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-7 h-7" })}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-navy/30 font-black mb-1">{item.label}</p>
                      {item.link ? (
                        <a href={item.link} target="_blank" className="text-2xl font-serif text-navy hover:text-teal transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-2xl font-serif text-navy">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-navy p-12 rounded-[3rem] shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal/10 rounded-full blur-3xl -mr-32 -mt-32" />
              <form onSubmit={handleContactSubmit} className="relative z-10 space-y-8">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-black text-white/40">Full Name</label>
                  <input 
                    name="name"
                    required 
                    type="text" 
                    className="w-full bg-white/5 border-b border-white/10 py-4 text-white focus:border-teal outline-none transition-all text-lg" 
                    placeholder="Enter your name" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-black text-white/40">Email Address</label>
                  <input 
                    name="email"
                    required 
                    type="email" 
                    className="w-full bg-white/5 border-b border-white/10 py-4 text-white focus:border-teal outline-none transition-all text-lg" 
                    placeholder="Enter your email" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-black text-white/40">Message</label>
                  <textarea 
                    name="message"
                    required 
                    rows={4} 
                    className="w-full bg-white/5 border-b border-white/10 py-4 text-white focus:border-teal outline-none transition-all text-lg resize-none" 
                    placeholder="Describe your project" 
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full py-6 bg-teal text-white rounded-2xl font-black uppercase tracking-[0.3em] text-sm hover:bg-white hover:text-navy transition-all duration-500 flex items-center justify-center gap-3 group"
                >
                  Send to WhatsApp <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-navy text-white/30 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-4xl font-serif font-black tracking-tighter text-white">
            M<span className="text-teal">.</span>P
          </div>
          <div className="text-sm tracking-[0.3em] uppercase font-bold text-center">
            &copy; {new Date().getFullYear()} Monit Prajapati. Crafted for Excellence.
          </div>
          <div className="flex gap-10">
            <a href="#" className="hover:text-teal transition-all hover:scale-110"><Linkedin className="w-6 h-6" /></a>
            <a href="#" className="hover:text-teal transition-all hover:scale-110"><Mail className="w-6 h-6" /></a>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
