import React from "react";
import {
  CheckCircle2,
  XCircle,
  ArrowLeft,
  MessageSquare,
  Zap,
  Target,
} from "lucide-react";

const Dashboard = ({ results, onReset }) => {
  const getScoreColor = (score) => {
    if (score >= 80)
      return "text-emerald-600 bg-emerald-50 border-emerald-200 ring-emerald-100";
    if (score >= 60)
      return "text-amber-600 bg-amber-50 border-amber-200 ring-amber-100";
    return "text-rose-600 bg-rose-50 border-rose-200 ring-rose-100";
  };

  const scoreTheme = getScoreColor(results.match_score);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
      {/* Header & Reset */}
      <div className="flex items-center justify-between">
        <button
          onClick={onReset}
          className="group flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors px-4 py-2 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow">
          <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          New Analysis
        </button>
      </div>

      {/* Top Banner: Match Score */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/3 opacity-50 blur-3xl"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <Target className="w-8 h-8 text-blue-500" />
            Candidate Alignment
          </h2>
          <p className="text-slate-500 mt-2 font-medium">
            AI analysis based on core competencies and job requirements.
          </p>
        </div>

        <div
          className={`relative z-10 flex items-center justify-center w-32 h-32 rounded-full border-4 ring-8 ${scoreTheme}`}>
          <span className="text-4xl font-black tracking-tighter">
            {results.match_score}
            <span className="text-2xl">%</span>
          </span>
        </div>
      </div>

      {/* Middle Section: Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Strengths Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-shadow">
          <div className="bg-emerald-50/50 p-6 border-b border-emerald-100 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900">
              Validated Strengths
            </h3>
          </div>
          <ul className="p-6 space-y-4">
            {results.strengths.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-slate-700 font-medium">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-shadow">
          <div className="bg-rose-50/50 p-6 border-b border-rose-100 flex items-center gap-3">
            <XCircle className="w-6 h-6 text-rose-600" />
            <h3 className="text-lg font-bold text-slate-900">
              Identified Gaps
            </h3>
          </div>
          <ul className="p-6 space-y-4">
            {results.weaknesses.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-slate-700 font-medium">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-xs font-bold mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Section: Interview Co-Pilot */}
      <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-800">
        <div className="p-6 md:p-8 bg-slate-800/50 border-b border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Strategic Interview Co-Pilot
            </h3>
          </div>
          <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
            AI Generated
          </span>
        </div>

        <div className="p-6 md:p-8 space-y-4">
          {results.interview_questions.map((q, idx) => (
            <div
              key={idx}
              className="group bg-slate-800/50 hover:bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300 flex items-start gap-4">
              <MessageSquare className="w-5 h-5 text-slate-500 group-hover:text-blue-400 mt-0.5 flex-shrink-0 transition-colors" />
              <p className="text-slate-300 group-hover:text-white font-medium leading-relaxed">
                {q}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
