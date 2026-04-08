import React from "react";
import {
  Briefcase,
  Zap,
  Target,
  ShieldCheck,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  BarChart3,
  Users,
} from "lucide-react";

const Landing = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-200 overflow-hidden">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative z-20">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg shadow-md shadow-blue-200/50">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
            TalentDecode
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <button className="sm:block text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
            Product
          </button>
          <button className="sm:block text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
            Pricing
          </button>
          <button
            onClick={onGetStarted}
            className="text-sm hidden font-bold bg-white border border-slate-200 shadow-sm hover:shadow text-slate-700 px-4 py-2 rounded-lg transition-all hover:border-blue-300 hover:text-blue-600">
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-16 pb-20 flex flex-col lg:flex-row items-center gap-16 relative z-10">
        {/* Background glow */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-3xl -z-10"></div>

        {/* Left text */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-sm">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="uppercase tracking-wide">
              Powered by Groq Llama 3
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700">
            Hire Smarter.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Decode the Data.
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-500 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            Stop guessing and start matching. TalentDecode is an AI-powered HR
            Co-Pilot that instantly cross-references resumes against job
            descriptions to find your perfect candidate.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <button
              onClick={onGetStarted}
              className="group w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-1">
              Start Analyzing Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-sm font-semibold text-slate-400">
              No credit card required
            </p>
          </div>
        </div>

        {/* Right Floating Mockup (Dynamic visual) */}
        <div className="flex-1 w-full max-w-lg relative animate-in fade-in zoom-in duration-1000 delay-300">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-indigo-500 transform rotate-3 rounded-3xl opacity-20 blur-xl"></div>
          <div className="bg-white border border-slate-200 shadow-2xl rounded-3xl p-8 relative z-10 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
            <div className="flex justify-between items-start border-b border-slate-100 pb-6 mb-6">
              <div>
                <h3 className="font-extrabold text-slate-900 text-xl">
                  Candidate Match
                </h3>
                <p className="text-sm text-slate-500 font-medium">
                  Senior React Developer
                </p>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-emerald-50 text-emerald-500 bg-emerald-100 flex items-center justify-center font-black text-xl">
                92%
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-bold text-slate-700">
                  7+ years React experience
                </span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-bold text-slate-700">
                  Scaled enterprise architecture
                </span>
              </div>
              <div className="flex items-center gap-3 bg-rose-50 p-3 rounded-lg border border-rose-100">
                <Target className="w-5 h-5 text-rose-500" />
                <span className="text-sm font-bold text-slate-700">
                  Missing AWS certification
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Social Proof Section */}
      <section className="border-y border-slate-200 bg-white py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 opacity-60 grayscale">
          <p className="font-bold text-slate-400 text-sm tracking-widest uppercase text-center md:text-left">
            Trusted by modern hiring teams
          </p>
          <div className="flex items-center gap-16 flex-wrap font-black text-xl text-slate-500">
            <marquee behavior="" direction="left">
            <span className="pl-4">Acme Corp</span>
            <span className="pl-4">GlobalTech</span>
            <span className="pl-4">NexusFlow</span>
            </marquee>
          </div>
        </div>
      </section>

      {/* Expanded Features Grid */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything you need to hire right.
            </h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto font-medium text-lg">
              We built the core infrastructure so you don't have to manually dig
              through paperwork.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <BarChart3 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Instant Alignment
              </h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                Upload a candidate's resume and your target JD. Our engine
                calculates a deterministic match score in less than 3 seconds.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Skill Gap Detection
              </h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                Automatically extract validated strengths and highlight critical
                missing skills before you even schedule the first screening
                call.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <BrainCircuit className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Strategic Co-Pilot
              </h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                Generate highly targeted, behavioral interview questions
                designed specifically to test the candidate's exact weaknesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-800 opacity-90"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to decode your next hire?
          </h2>
          <p className="text-blue-100 text-lg mb-10 font-medium">
            Join modern HR teams who are cutting screening time by 80%.
          </p>
          <button
            onClick={onGetStarted}
            className="px-10 py-5 bg-white text-blue-600 hover:bg-slate-50 rounded-xl font-black text-lg shadow-2xl transition-all hover:scale-105 flex items-center gap-2 mx-auto">
            Launch the Engine
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Massive Professional Footer */}
      <footer className="bg-slate-900 pt-20 pb-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-600 p-1.5 rounded text-white">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="text-xl font-extrabold text-white">
                  TalentDecode
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                Building the core, decoding the data. The next generation of HR
                intelligence.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-slate-400 font-medium">
                <li className="hover:text-blue-400 cursor-pointer transition-colors">
                  Features
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">
                  Pricing
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">
                  Security
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Resources</h4>
              <ul className="space-y-3 text-sm text-slate-400 font-medium">
                <li className="hover:text-blue-400 cursor-pointer transition-colors">
                  Documentation
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">
                  API Reference
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">
                  Blog
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-slate-400 font-medium">
                <li className="hover:text-blue-400 cursor-pointer transition-colors">
                  About Us
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">
                  Careers
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">
                  Contact
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm font-medium">
              © 2026 TalentDecode. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-500 font-medium">
              <span className="hover:text-white cursor-pointer transition-colors">
                Privacy Policy
              </span>
              <span className="hover:text-white cursor-pointer transition-colors">
                Terms of Service
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
