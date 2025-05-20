import { motion } from "framer-motion";

const projects = [
  { id: 1, title: "Advisor360°", image: "/images/project1.jpg" },
  { id: 2, title: "Harvard Business School", image: "/images/project2.jpg" },
  { id: 3, title: "UCL", image: "/images/project3.jpg" },
  { id: 4, title: "Greek Bakery", image: "/images/project4.jpg" },
];

export default function ProjectGrid() {
  return (
    <main className="ml-[24%] w-[76%] min-h-screen grid grid-cols-2 gap-6 p-16 bg-gray-100">
      {projects.map((project) => (
        <motion.div
          key={project.id}
          className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all">
            <span className="text-white text-2xl font-bold opacity-0 group-hover:opacity-100">
              {project.title}
            </span>
          </div>
        </motion.div>
      ))}
    </main>
  );
}