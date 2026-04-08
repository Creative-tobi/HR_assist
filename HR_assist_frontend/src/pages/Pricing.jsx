import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, CheckCircle2, Zap } from "lucide-react";

const Pricing = () => {
  const [annual, setAnnual] = useState(true);

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
          <Link
            to="/product"
            className="text-slate-500 hover:text-slate-900 transition-colors">
            Product
          </Link>
          <Link to="/pricing" className="text-blue-600 transition-colors">
            Pricing
          </Link>
          <Link
            to="/app"
            className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-all shadow-md">
            Sign In
          </Link>
        </div>
      </nav>

      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 pt-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
          Simple, transparent pricing.
        </h1>
        <p className="text-lg text-slate-500 font-medium mb-10">
          Start decoding candidates for free. Upgrade when your hiring scales.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span
            className={`text-sm font-bold ${!annual ? "text-slate-900" : "text-slate-400"}`}>
            Monthly
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className="w-14 h-8 bg-blue-600 rounded-full relative transition-colors focus:outline-none">
            <div
              className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform duration-300 ${annual ? "translate-x-7" : "translate-x-1"}`}></div>
          </button>
          <span
            className={`text-sm font-bold flex items-center gap-2 ${annual ? "text-slate-900" : "text-slate-400"}`}>
            Annually{" "}
            <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Starter */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Starter</h3>
          <p className="text-slate-500 text-sm font-medium mb-6">
            Perfect for small teams and solo recruiters.
          </p>
          <div className="mb-8">
            <span className="text-4xl font-black text-slate-900">
              ${annual ? "0" : "0"}
            </span>
            <span className="text-slate-500 font-medium">/month</span>
          </div>
          <ul className="space-y-4 mb-8 flex-grow">
            {[
              "10 resume analyses per month",
              "Basic Match Scoring",
              "Strengths & Weaknesses extraction",
              "Standard email support",
            ].map((feature, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-slate-700 font-medium text-sm">
                <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />{" "}
                {feature}
              </li>
            ))}
          </ul>
          <Link
            to="/app"
            className="w-full py-4 rounded-xl font-bold text-center border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all">
            Start Free
          </Link>
        </div>

        {/* Pro (Highlighted) */}
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl relative flex flex-col transform md:-translate-y-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full flex items-center gap-1">
            <Zap className="w-3 h-3" /> Most Popular
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Growth Team</h3>
          <p className="text-slate-400 text-sm font-medium mb-6">
            For aggressive hiring sprints and agencies.
          </p>
          <div className="mb-8">
            <span className="text-4xl font-black text-white">
              ${annual ? "49" : "59"}
            </span>
            <span className="text-slate-400 font-medium">/month</span>
          </div>
          <ul className="space-y-4 mb-8 flex-grow">
            {[
              "Unlimited resume analyses",
              "Interactive AI Interview Simulator",
              "Export reports to PDF/CSV",
              "Priority 24/7 Support",
              "Custom JD templates",
            ].map((feature, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-slate-300 font-medium text-sm">
                <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />{" "}
                {feature}
              </li>
            ))}
          </ul>
          <Link
            to="/app"
            className="block w-full py-4 rounded-xl font-bold text-center bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20 transition-all">
            Upgrade to Growth
          </Link>
        </div>

        {/* Enterprise */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Enterprise</h3>
          <p className="text-slate-500 text-sm font-medium mb-6">
            Custom infrastructure for massive organizations.
          </p>
          <div className="mb-8">
            <span className="text-4xl font-black text-slate-900">Custom</span>
          </div>
          <ul className="space-y-4 mb-8 flex-grow">
            {[
              "Everything in Growth",
              "ATS Integrations (Workday, Greenhouse)",
              "Custom AI model fine-tuning",
              "Dedicated Success Manager",
              "SSO & Advanced Security",
            ].map((feature, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-slate-700 font-medium text-sm">
                <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />{" "}
                {feature}
              </li>
            ))}
          </ul>
          <button className="w-full py-4 rounded-xl font-bold text-center border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
