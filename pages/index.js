import Sidebar from "../components/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// const CORRECT_PASSWORD = "password123"; // We'll improve this later
const CORRECT_PASSWORD = process.env.NEXT_PUBLIC_PORTFOLIO_PASSWORD;

const projects = [
  {
    title: "Feedback Sentiment Analysis",
    year: "2023 - 2025",
    image: "/images/advisorfeedback2.jpg",
    link: "/projects/advisor360",
  },
  {
    title: "Log Sequence Visualizations",
    year: "2024 - 2025",
    image: "/images/userflow.jpg",
    link: "/projects/ga_data",
  },
  {
    title: "User Behavior Clustering",
    year: "2024",
    image: "/images/a_b.jpg",
    link: "/projects/ag_columns",
  },
  {
    title: "ML Correlation Analysis",
    year: "2024",
    image: "/images/props.jpg",
    link: "/projects/proposals",
  },
  {
    title: "Value Mapping Survey",
    year: "2023",
    image: "/images/trad2.jpg",
    link: "/projects/valuemap",
  },
  {
    title: "Harvard Business School – Determinants of Early Stage Startup Performance",
    year: "2022",
    image: "/images/hbs2.png",
    link: "/projects/hbs",
    specialFit: true,
  },
  {
    title: "University College London School of Management – Willingness to Take Risks",
    year: "2021",
    image: "/images/project3.jpg",
    link: "/projects/ucl",
  },
];

export default function Home() {
  const [imageLoaded, setImageLoaded] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Track which images have loaded
  const handleImageLoad = (index) => {
    setImageLoaded(prev => ({...prev, [index]: true}));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
      // Optionally, store authentication status in localStorage/sessionStorage
      sessionStorage.setItem('portfolioAuthenticated', 'true');
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  // Check for stored authentication status on component mount
  useEffect(() => {
    const storedAuth = sessionStorage.getItem('portfolioAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Project Grid Section */}
      <main className="mt-12 w-full pl-20 pr-4 sm:pr-8 lg:pl-0 lg:ml-[calc(20%+4.5rem)] lg:mr-8 lg:w-[calc(80%-6.5rem)] min-h-screen bg-background grid grid-cols-1 sm:grid-cols-2 gap-0">
        {projects.map((project, index) => (
          <Link
            key={index}
            href={project.link}
            className="relative group block w-full aspect-square overflow-hidden"
          >
            <div className="relative w-full h-full bg-gray-100">
              <Image
                src={project.image}
                alt={project.title}
                layout="fill"
                objectFit={project.specialFit ? "contain" : "cover"}
                objectPosition={project.specialFit ? "center" : "center"}
                className={`transition-transform duration-500 group-hover:scale-105 ${
                  project.specialFit ? "p-4" : ""
                }`}
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={95}
                onLoadingComplete={() => handleImageLoad(index)}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="bg-white bg-opacity-90 p-6 rounded-xl border border-gray-200 text-center shadow-xl w-4/5 h-4/5 flex flex-col items-center justify-center">
                <span className="text-base text-gray-600 mb-2">{project.year}</span>
                <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
              </div>
            </div>
          </Link>
        ))}
      </main>

      {/* Password Overlay */}
      {!isAuthenticated && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-md">
          <form onSubmit={handlePasswordSubmit} className="p-8 bg-white rounded-xl border border-gray-300 shadow-2xl max-w-sm w-full mx-4">
            <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">Portfolio Access</h1>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow shadow-sm pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-r-lg"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                )}
              </button>
            </div>
            {error && <p className="text-red-600 text-sm mb-4 text-center font-medium">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 shadow-md hover:shadow-lg"
            >
              Access Portfolio
            </button>
          </form>
        </div>
      )}
    </div>
  );
}