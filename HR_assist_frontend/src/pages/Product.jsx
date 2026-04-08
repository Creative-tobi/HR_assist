import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, ChevronDown, Bot, Shield, Zap } from "lucide-react";

const faqs = [
  {
    q: "How does the AI calculate the Match Score?",
    a: "Our engine uses deterministic data extraction. It breaks down the Job Description into core competencies, then scans the resume specifically for validated proof of those competencies, returning a strict mathematical alignment score.",
  },
  {
    q: "Is candidate data stored on your servers?",
    a: "No. TalentDecode uses strictly in-memory processing. When you upload a PDF, it is processed in the server's RAM and immediately discarded. We do not save, store, or train our models on your candidates' resumes.",
  },
  {
    q: "What types of files are supported?",
    a: "Currently, our engine processes text-based PDF files (the industry standard for resumes). We do not support scanned images or locked PDFs.",
  },
  {
    q: "Can I use the Interview Simulator for technical rounds?",
    a: "Yes! The Interactive Co-Pilot generates both behavioral and technical questions based specifically on the gaps found between the resume and the JD.",
  },
];

const Product = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-200 pb-24">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 group cursor-pointer transition-all">
          <div className="bg-blue-600 p-2 rounded-lg shadow-sm shadow-blue-200 group-hover:scale-105 transition-transform duration-300">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-extrabold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors duration-300">
            TalentDecode
          </span>
        </Link>
        <div className="flex gap-6 items-center font-bold text-sm">
          <Link to="/product" className="text-blue-600 transition-colors">
            Product
          </Link>
          <Link
            to="/pricing"
            className="text-slate-500 hover:text-slate-900 transition-colors">
            Pricing
          </Link>
          <Link
            to="/app"
            className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-all shadow-md">
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-20 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
          Engineered for accuracy.
        </h1>
        <p className="text-lg text-slate-500 font-medium leading-relaxed">
          We rebuilt the screening process from the ground up. By utilizing the
          blazing-fast Llama 3 architecture, we removed the bias and friction
          from HR.
        </p>
      </div>

      {/* Product Deep Dive */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 mb-24">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3">Sub-3 Second Parsing</h3>
          <p className="text-slate-500 font-medium leading-relaxed">
            Our custom Express architecture and in-memory Multer processing
            means we decode complex candidate PDFs faster than you can open an
            email.
          </p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
            <Bot className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3">Dynamic Persona AI</h3>
          <p className="text-slate-500 font-medium leading-relaxed">
            The simulator doesn't just read questions. It takes on the persona
            of the candidate's exact experience level to help you dry-run
            interviews.
          </p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3">Zero Data Retention</h3>
          <p className="text-slate-500 font-medium leading-relaxed">
            Enterprise-grade privacy is built into the core. Buffers are parsed
            and instantly garbage-collected, ensuring candidate data never hits
            a hard drive.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
                <span className="font-bold text-slate-900 text-lg">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? "max-h-48 pb-6 opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
