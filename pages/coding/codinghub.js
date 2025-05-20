import React from "react";
import Sidebar from "../../components/Sidebar";
import Link from "next/link";
import { FaDatabase, FaPython, FaReact, FaArrowRight } from "react-icons/fa";

export default function CodingHub() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="w-full xl:ml-[24%] xl:w-[76%] xl:snap-y xl:snap-mandatory xl:h-screen xl:overflow-scroll">
        <section className="py-16 px-4 xl:p-8 xl:snap-start xl:h-screen flex flex-col justify-center items-center relative">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-blue-600">
              Coding Portfolio
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Explore my programming work across different languages and technologies.
              From database optimization with SQL to data science with Python and web application
              development.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
              {/* SQL Card */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-blue-600 h-2"></div>
                <div className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <FaDatabase className="text-blue-600 text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">SQL & Analytics</h3>
                  <p className="text-gray-600 mb-6">
                    Data modeling, analytics scripts, and query optimization for large-scale datasets.
                  </p>
                  <Link 
                    href="/coding/sql"
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                  >
                    Explore SQL work <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
              
              {/* Python Card */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-green-600 h-2"></div>
                <div className="p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <FaPython className="text-green-600 text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Python</h3>
                  <p className="text-gray-600 mb-6">
                    Data science, machine learning, and automation projects using Python.
                  </p>
                  <Link 
                    href="/coding/python"
                    className="inline-flex items-center text-green-600 font-medium hover:text-green-800 transition-colors"
                  >
                    Explore Python work <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
              
              {/* Web Apps Card */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-purple-600 h-2"></div>
                <div className="p-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <FaReact className="text-purple-600 text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Web Applications</h3>
                  <p className="text-gray-600 mb-6">
                    Interactive web applications and dashboards built with modern frameworks.
                  </p>
                  <Link 
                    href="/coding/web-apps"
                    className="inline-flex items-center text-purple-600 font-medium hover:text-purple-800 transition-colors"
                  >
                    Explore web apps <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 