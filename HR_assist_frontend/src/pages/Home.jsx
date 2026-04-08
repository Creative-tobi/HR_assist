import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Uploader from "../components/Uploader";
import Dashboard from "../components/Dashboard";
import { Briefcase, Loader2, Sparkles, Terminal, X } from "lucide-react";

const loadingSteps = [
  "Initializing Llama-3 core engine...",
  "Parsing PDF document structure...",
  "Extracting candidate competencies...",
  "Cross-referencing against Job Description...",
  "Calculating deterministic match score...",
  "Generating strategic interview protocol...",
  "Finalizing dashboard...",
];

const SAMPLE_JD =
  "We are looking for a Senior Frontend Developer with 5+ years of experience in React, modern JavaScript (ES6+), and Vite. The ideal candidate will have a strong understanding of state management, Tailwind CSS, and REST API integration. Experience with CI/CD pipelines and AWS is a major plus.";

const Home = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [results, setResults] = useState(null);

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadingTextIndex((prev) =>
          prev < loadingSteps.length - 1 ? prev + 1 : prev,
        );
      }, 1200);
    } else {
      setLoadingTextIndex(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleAnalysis = async () => {
    if (!file || !jobDescription)
      return alert("Please provide both a PDF and a Job Description.");

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    try {
      const response = await axios.post(
        "https://hr-assist-xcst.onrender.com/api/analyze",
        // "http://localhost:5000/api/analyze",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      setResults(response.data);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Error analyzing candidate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-200">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 group cursor-pointer transition-all">
            <div className="bg-blue-600 p-2 rounded-lg shadow-sm shadow-blue-200 group-hover:scale-105 transition-transform duration-300">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors duration-300">
              TalentDecode
            </h1>
          </Link>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200 text-sm font-bold text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Engine Online
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {!results ? (
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-200 overflow-hidden transition-all duration-500 relative">
            {loading && (
              <div className="absolute inset-0 bg-slate-900/95 z-50 flex flex-col items-center justify-center p-6 backdrop-blur-sm animate-in fade-in duration-300">
                <Terminal className="w-12 h-12 text-blue-400 mb-6 animate-pulse" />
                <div className="h-8 flex items-center justify-center">
                  <p
                    className="text-blue-400 font-mono text-lg font-medium tracking-tight animate-in slide-in-from-bottom-2 fade-in duration-300"
                    key={loadingTextIndex}>
                    {`> ${loadingSteps[loadingTextIndex]}`}
                  </p>
                </div>
                <div className="w-64 h-1.5 bg-slate-800 rounded-full mt-8 overflow-hidden">
                  <div
                    className="h-full bg-blue-500 animate-pulse"
                    style={{
                      width: `${((loadingTextIndex + 1) / loadingSteps.length) * 100}%`,
                      transition: "width 1s ease-in-out",
                    }}></div>
                </div>
              </div>
            )}

            <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    1
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Upload Profile
                  </h2>
                </div>
                <Uploader file={file} setFile={setFile} />
              </div>

              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                      2
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Define Role
                    </h2>
                  </div>
                  <button
                    onClick={() => setJobDescription(SAMPLE_JD)}
                    className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> <span className="hidden md:flex">Load Sample</span>
                  </button>
                </div>

                <div className="relative flex-grow flex flex-col">
                  <textarea
                    className="flex-grow p-5 pr-10 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 focus:outline-none resize-none transition-all text-sm leading-relaxed text-slate-700 shadow-inner bg-slate-50/50"
                    placeholder="Paste the target job description, required skills, and daily responsibilities here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    // NEW UX MAGIC: If the user clicks into the box and it contains the sample text, highlight it all!
                    onFocus={(e) => {
                      if (e.target.value === SAMPLE_JD) {
                        e.target.select();
                      }
                    }}
                  />
                  {/* NEW UX MAGIC: A clear button appears when there is text */}
                  {jobDescription && (
                    <button
                      onClick={() => setJobDescription("")}
                      className="absolute top-3 right-3 p-1.5 bg-slate-200 hover:bg-rose-100 text-slate-500 hover:text-rose-600 rounded-lg transition-colors"
                      title="Clear Text">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <button
                  onClick={handleAnalysis}
                  disabled={loading}
                  className="mt-6 w-full group relative overflow-hidden bg-slate-900 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg flex justify-center items-center gap-2">
                  <Sparkles className="w-5 h-5 group-hover:animate-spin" />
                  <span>Decode Candidate Data</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Dashboard results={results} onReset={() => setResults(null)} />
        )}
      </main>
    </div>
  );
};

export default Home;
