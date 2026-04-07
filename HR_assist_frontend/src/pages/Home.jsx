import React, { useState } from "react";
import axios from "axios";
import Uploader from "../components/Uploader";
import Dashboard from "../components/Dashboard";
import { Briefcase, Loader2 } from "lucide-react";

const Home = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleAnalysis = async () => {
    if (!file || !jobDescription)
      return alert("Please provide both a PDF and a Job Description.");

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/analyze",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800 font-sans selection:bg-blue-200">
      {/* Premium Glassmorphism Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/70 border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg shadow-sm shadow-blue-200">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              TalentDecode
            </h1>
            <span className="bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ml-2 hidden sm:block">
              HR Co-Pilot
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {!results ? (
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
            <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Left Side: Upload */}
              <div className="flex flex-col h-full">
                <h2 className="text-lg font-bold text-slate-800 mb-4">
                  1. Upload Candidate Profile
                </h2>
                <Uploader file={file} setFile={setFile} />
              </div>

              {/* Right Side: JD & Action */}
              <div className="flex flex-col h-full">
                <h2 className="text-lg font-bold text-slate-800 mb-4">
                  2. Define Role Requirements
                </h2>
                <textarea
                  className="flex-grow p-5 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 focus:outline-none resize-none transition-all text-sm leading-relaxed text-slate-700 shadow-inner"
                  placeholder="Paste the target job description, required skills, and daily responsibilities here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />

                <button
                  onClick={handleAnalysis}
                  disabled={loading}
                  className="mt-6 w-full relative group overflow-hidden bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 disabled:bg-slate-300 disabled:cursor-not-allowed shadow-lg shadow-blue-200 flex justify-center items-center gap-2">
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Decoding Data...</span>
                    </>
                  ) : (
                    <span>Analyze Candidate Match</span>
                  )}
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
