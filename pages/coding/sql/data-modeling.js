import { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaDatabase, FaArrowLeft } from "react-icons/fa";

export default function SQLDataModeling() {
  return (
    <div className="flex xl:h-screen xl:overflow-hidden">
      <Sidebar />
      
      <main className="w-full xl:ml-[24%] xl:w-[76%] py-16 px-4 xl:p-8 xl:overflow-y-scroll">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="mb-6">
              <Link 
                href="/coding/sql"
                className="text-blue-600 hover:underline flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Back to SQL Overview
              </Link>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">SQL Data Modeling</h1>
            <p className="text-lg text-gray-600">
              Coming soon! This section will showcase data modeling techniques and schema design examples.
            </p>
          </motion.div>

          {/* Placeholder Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center"
          >
            <FaDatabase className="text-blue-500 text-6xl mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Content In Development</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              I'm currently preparing examples of data modeling techniques, dimensional schema design, 
              and query optimization strategies to showcase in this section.
            </p>
            <Link
              href="/coding/sql/analytics"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Meanwhile, check out SQL Analytics Examples
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
} 