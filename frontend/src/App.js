import React, { useRef, useEffect, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";


const projects = [
  {
    title: "Calculator",
    desc: "A simple calculator application with basic arithmetic operations buit in Java Swing.",
    tech: ["Java"],
    github: "https://github.com/hundetolera10/java-calculator",
    features: [
      "Add , Subtract, Multiply, Divide operations",
      "handle decimal numbers and negative values",
      "user-friendly interface with buttons and display",
    ]
  },

  {
    title: "Mental Health API (on going)",
    desc: "REST API for mental health support system",
    tech: ["Django", "DRF", "PostgreSQL"],
    github: "https://github.com/hundetolera10/mental-health-api",
    features: [
      "User authentication and authorization",
      "Mood tracking and journaling system",
      "AI chatbot for mental health support "
    ]

  },
  {
    title: "E-commerce API",
    desc: "Fully functional e-commerce Backend API with user authentication, product management, and order processing.",
    tech: ["Python", "Django", "DRF", "SQLite"],
    github: "https://github.com/hundetolera10/ecommerce-api",
    features: [
      "User authentication and authorization",
      "Product management system",
      "Order processing and tracking"
    ]
  },
  {
    title: "Django REST API Lab",
    desc: "A collection of backend API projects built with Django and Django REST Framework, covering authentication, permissions, and advanced API features.",
    tech: ["Django", "Django REST Framework", "SQLite"],
    github: "https://github.com/hundetolera10/Alx_DjangoLearnLab",
    features: [
      "Authentication and permission system",
      "CRUD APIs with serializers and viewsets",
      "Advanced API features and security",
      "Modular project structure",
    ],
  },

];
const blog= [
  {
    title: "WHY I CHOSE BACKEND DEVELOPMENT",
    desc: "I chose backend development because I love building the core systems that make applications work. While the frontend is what users see, the backend is where logic, data, and functionality live. Working with Django allows me to create scalable, reliable, and efficient systems that power real-world solutions.",
  },
  {
    title: "AI + WEB DEVELOPMENT: THE FUTURE",
    desc: "AI is transforming how we interact with technology. I’m exploring ways to integrate machine learning with web apps to build smarter, more intuitive experiences. From recommendation systems to predictive analytics, AI helps me solve real-world problems and improve lives.",
  },
  {
    title: "LESSONS FROM BUILDING PROJECTS",
    desc: "Building projects has taught me valuable lessons about problem-solving, persistence, and the importance of continuous learning in the ever-evolving field of software development. From database design to deploying APIs, I’ve learned that attention to detail, teamwork, and continuous learning are the keys to success. Backend development lets me turn complex ideas into functional products that make an impact.",
  }
];
const skills = [
  {name: "HTML", icon: "https://cdn.simpleicons.org/html5" },
  { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss" },
  { name: "Django", icon: "https://cdn.simpleicons.org/django" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python" },
  { name: "React", icon: "https://cdn.simpleicons.org/react" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/" },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql"},
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git" },
  { name: "GitHub", icon: "https://cdn.simpleicons.org/github" },
  
];

export default function App() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]); 
  
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={dark ? "dark bg-gray-900 text-white min-h-screen" : "min-h-screen"}>
      <Toaster position="top-right"/>
      <Navbar dark={dark} setDark={setDark} />
      <Hero />
      <About />
      <Skills />
      <Projects dark={dark} />
      <Blogs />
      <Contact />
      <Footer />
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-5 right-5 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition"
      >
        ↑
      </button>
    </div>
  );
}



function Navbar({ dark, setDark }) {
  const [active, setActive] = useState("about");
  const[mobileOpen, setMobileOpen] = useState(false);

  const sections = ["about", "skills","projects","blogs", "contact"];

  // detect scroll section
  useEffect(() => {
    const handleScroll = () => {
      let current = "about";

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const top = section.offsetTop - 100;
          if (window.scrollY >= top) {
            current = id;
          }
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, );

  const linkStyle = (id) =>
    `relative cursor-pointer transition ${
      active === id ? "text-black dark:text-white font-semibold" : "text-gray-500"
    }`;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-700">

      <div className="max-w-6xl mx-auto flex items-center px-6 py-4 relative">

        {/* LEFT */}
        <h1 className="text-lg font-semibold">Hunde.</h1>

        {/* CENTER LINKS */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex gap-8 text-sm">

          {sections.map((item) => (
            <a key={item} href={`#${item}`} className={linkStyle(item)}>
              
              {item.charAt(0).toUpperCase() + item.slice(1)}

              {/* 🔥 animated underline */}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-black dark:bg-white transition-all duration-300 ${
                  active === item ? "w-full" : "w-0"
                }`}
              ></span>

            </a>
          ))}

        </div>

        {/* RIGHT */}
        <div className="ml-auto">
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {dark ? "☀️" : "🌙"}
          </button>
          {/* MOBILE MENU TOGGLE */
           <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition ml-2"
          >
            {mobileOpen ? "✖️" : "☰"}
          </button>}
        </div>
      </div>
      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex flex-col items-center py-4 md:hidden">
          <ul className="flex flex-col items-center py-4 space-y-4 text-sm">
            {sections.map ((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  className={linkStyle(item)}
                  onClick={() => setMobileOpen(false)}  //close menu</ul>
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      
    </nav>
  );
}

function Hero() {
    const fadeIn = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    };
  return (
    <motion.section
      id="hero"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center px-6 relative bg-gray-50 dark:bg-gray-900"
    >
      <hr className="border-gray-200 dark:border-gray-700 mb-10" />
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT IMAGE */}
        <div className="flex justify-center md:justify-start">
          <motion.img
            src={process.env.PUBLIC_URL + "/profile.jpg"}
            alt="profile"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-72 h-72 object-cover rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* RIGHT TEXT */}
        <div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <motion.p variants={fadeIn}>Hello, I'm</motion.p>
            <motion.h1
              variants={fadeIn}
              className="text-5xl font-bold"
            >
              Hunde Tolera
            </motion.h1>

            <motion.h2 variants={fadeIn}>
              Backend Developer | AI Enthusiast
            </motion.h2>
            <motion.div
              variants={fadeIn}
              className="flex gap-4 justify-center md:justify-start mt-6">
              <a
                href="/resume.pdf"
                className="border px-6 py-2 rounded-full hover:bg-black hover:text-white transition"
              >
                Download CV
              </a>

              <a
                href="#contact"
                className="bg-black text-white px-6 py-2 rounded-full"
              >
                Get in Touch
              </a>
            </motion.div>
            <div className="flex gap-6 mt-6 justify-center md:justify-start">
              <a href="https://github.com/hundetolera10/" target="_blank" rel="noreferrer">
                <FaGithub className="text-2xl hover:text-gray-500" />
              </a>
              <a href="https://www.linkedin.com/in/hunde-tolera-a439aa362/" target="_blank" rel="noreferrer">
                <FaLinkedin className="text-2xl hover:text-blue-500" />
              </a>
              <a href="https://www.instagram.com/hunde.tolera/" target="_blank" rel="noreferrer">
                <FaInstagram className="text-2xl hover:text-pink-500" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}    
function About() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-12">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* LEFT SIDE → TEXT */}
          <div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I'm a passionate backend developer specializing in Django and REST APIs.
              I build scalable systems with authentication, security, and real-world
              problem-solving in mind.
              <br /><br />
              Currently, my focus is on web development and artificial intelligence, exploring how these technologies can be combined to build innovative products.
              With a solid foundation in backend development, I thrive on turning complex ideas into functional, user-friendly applications.
              <br /><br />
              Driven by curiosity and continuous learning, I aim to contribute to projects that push the boundaries of technology while making a meaningful difference in the world.
            </p>
          </div>

          {/* RIGHT SIDE → CARDS */}
          <div className="flex flex-col gap-6">

            {/* EXPERIENCE */}
            <div className="border rounded-2xl p-6 shadow-md bg-white dark:bg-gray-800">
              <h3 className="text-xl font-semibold mb-2">Experience</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Intermiadete Backend Development (Django, APIs)
              </p>
            </div>

            {/* EDUCATION */}
            <div className="border rounded-2xl p-6 shadow-md bg-white dark:bg-gray-800">
              <h3 className="text-xl font-semibold mb-2">Education</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Software Engineering Student
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
function Skills() {
  return (
    <section id="skills" className="py-16 px-6 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-4"
      >
        Skills & Technologies
      </motion.h2>

      <p className="text-gray-500 mb-10 max-w-xl mx-auto">
        I work with modern technologies to build scalable, efficient, and reliable web applications.
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center p-4 rounded-2xl shadow-md hover:shadow-xl bg-white dark:bg-gray-800"
          >
            <img
              src={skill.icon}
              alt={skill.name}
              className="w-10 h-10 mb-2"
            />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Projects({ dark }) {
  const scrollRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const scrollAmount = 320; // Adjust this value based on your card width + gap
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollRef.current || isHovering) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovering]);
  return (
    <section id="projects" className="p-20 px-4 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto" >
      <hr className="border-gray-200 dark:border-gray-700 mb-10" />
      <p className="text-gray-500 mb-2 text-center">Explore My</p>
      <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
      {/* ARROWS */}
      <div className="flex justify-end gap-4 mb-4">
        <button
          onClick={scrollLeft}
          className={`px-3 py-2 border rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition ${
            dark ? "text-white" : "text-black"
          }`}
        >
          ←
        </button>
        <button
          onClick={scrollRight}
          className={`px-3 py-2 border rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition ${
            dark ? "text-white" : "text-black"
          }`}
        >
          →
        </button>
      </div>
      {/* SCROLL CONTAINER */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
      >
        {projects.map((p, i) => (
          <ProjectCard
            key={i}
            title={p.title}
            desc={p.desc}
            tech={p.tech}
            github={p.github}
            features={p.features}
            i={i}
          />
        ))}
      </div>
      </div>
    </section>
  );
}

function ProjectCard({ title, desc, tech, github, features = [], i = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4, delay: i * 0.2 }}
      className="mini-w-[300px] max-w-[300px] border rounded-2xl p-6 snap-start bg-white dark:bg-gray-800 shadow-lg flex-shrink-0"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{desc}</p>
      <ul className="text-sm text-gray-500 dark:text-gray-400 mb-4 list-disc list-inside">
        {features.map((item,index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>   
      <div className="flex flex-wrap gap-2 mb-4">
        {tech.map((t, i) => (
          <span
            key={i}
            className="text-xs bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex gap-4">
        <a
         href={github}
         target="_blank"rel="noreferrer"
         className="border px-4 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          GitHub →
        </a>
      </div> 
    </motion.div>
  );
}
function Blogs() {
  const scrollRef = useRef(null);

  return (
    <section id="blogs" className="py-20 px-4 bg-gray-100 dark:bg-gray-900">
      <hr className="border-gray-200 dark:border-gray-700 mb-10" />
      <h2 className="text-3xl font-bold mb-6 text-center">Blogs</h2>
      {/* SCROLL */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth">
        {blog.map((b, i) => (
          <div
            key={i}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow"
          >
            <h3 className="text-xl font-semibold mb-2">{b.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [loading, setLoading] = useState(false);  
  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("http://localhost:5000/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
       },
       body: JSON.stringify(data),
      });

      const result = await res.json();

      console.log(result);
      
      if (res.ok) {
        toast.success("Message sent successfully 🚀");
      } else {
        toast.error("Failed to send message ❌");
      }
    } catch (error) {
      toast.error("Error occurred while sending message ❌");
    }
    setLoading(false);
  };
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="p-20 px-4 text-center bg-gray-50 dark:bg-gray-900"
    >
      <hr className="border-gray-200 dark:border-gray-700 mb-10" />
      <h2 className="text-3xl font-bold mb-6">Contact Me</h2>

      <form
        onSubmit={sendEmail}
        className="max-w-xl mx-auto flex flex-col gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="p-3 border rounded bg-white text-black dark:bg-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="p-3 border rounded bg-white text-black dark:bg-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          required
          className="p-3 border h-32 rounded bg-white text-black dark:bg-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white py-3 rounded hover:bg-gray-800 transition"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </motion.section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center py-6 mt-10">
      <p className="text-sm text-gray-400">
        © {new Date().getFullYear()} Hunde Tolera. All rights reserved.
      </p>
    </footer>
  );
}
