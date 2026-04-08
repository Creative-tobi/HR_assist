import React, { useState } from "react";
import axios from "axios";
import {
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Zap,
  Target,
  PlayCircle,
  Send,
  Bot,
  User,
  Loader2,
} from "lucide-react";

const Dashboard = ({ results, onReset }) => {
  const [activeSimulator, setActiveSimulator] = useState(null);

  // Real-time Chat State
  const [chatHistory, setChatHistory] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);

  // Opens the simulator and sets the first question
  const openSimulator = (idx, question) => {
    setActiveSimulator(idx);
    setChatHistory([{ role: "interviewer", content: question }]);
    setChatInput("");
  };

  // Sends the message to our new Express endpoint
  const handleSendMessage = async () => {
    if (!chatInput.trim() || isSimulating) return;

    const newMessage = chatInput;
    const currentHistory = [...chatHistory];

    // Add interviewer message to UI immediately
    setChatHistory([
      ...currentHistory,
      { role: "interviewer", content: newMessage },
    ]);
    setChatInput("");
    setIsSimulating(true);

    try {
      const response = await axios.post("https://hr-assist-xcst.onrender.com/api/simulate", {
        originalQuestion: results.interview_questions[activeSimulator],
        history: currentHistory.slice(1), // Send history (excluding the first prompt question)
        newMessage: newMessage,
        strengths: results.strengths,
        weaknesses: results.weaknesses,
      });

      // Add Candidate's AI response to the UI
      setChatHistory((prev) => [
        ...prev,
        { role: "candidate", content: response.data.reply },
      ]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        {
          role: "candidate",
          content: "Sorry, I lost my connection. Could you repeat that?",
        },
      ]);
    } finally {
      setIsSimulating(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80)
      return "text-emerald-600 bg-emerald-50 border-emerald-200 ring-emerald-100";
    if (score >= 60)
      return "text-amber-600 bg-amber-50 border-amber-200 ring-amber-100";
    return "text-rose-600 bg-rose-50 border-rose-200 ring-rose-100";
  };

  const scoreTheme = getScoreColor(results.match_score);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 fade-in duration-500 pb-20">
      <div className="flex items-center justify-between">
        <button
          onClick={onReset}
          className="group flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors px-4 py-2 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow">
          <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          New Analysis
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/3 opacity-50 blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 flex items-center gap-3">
            <Target className="w-8 h-8 text-blue-500" />
            Candidate Alignment
          </h2>
          <p className="text-slate-500 mt-2 font-medium text-lg">
            AI analysis based on core competencies and job requirements.
          </p>
        </div>
        <div
          className={`relative z-10 flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full border-4 ring-8 ${scoreTheme}`}>
          <span className="text-4xl md:text-6xl font-black tracking-tighter">
            {results.match_score}
            <span className="text-2xl md:text-3xl">%</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
          <div className="bg-emerald-50/50 p-6 border-b border-emerald-100 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <h3 className="text-xl font-bold text-slate-900">
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

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
          <div className="bg-rose-50/50 p-6 border-b border-rose-100 flex items-center gap-3">
            <XCircle className="w-6 h-6 text-rose-600" />
            <h3 className="text-xl font-bold text-slate-900">
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

      <div className="bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-800 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-32 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="p-6 md:p-8 border-b border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-2.5 rounded-xl border border-blue-500/30">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Interactive Co-Pilot
              </h3>
              <p className="text-slate-400 text-sm font-medium mt-1">
                Generated specifically to test this candidate's weak points.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6 relative z-10">
          {results.interview_questions.map((q, idx) => (
            <div
              key={idx}
              className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden transition-all duration-300">
              <div className="p-5 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                  Q{idx + 1}
                </div>
                <div className="flex-grow">
                  <p className="text-white font-medium leading-relaxed text-lg">
                    {q}
                  </p>

                  {activeSimulator !== idx && (
                    <button
                      onClick={() => openSimulator(idx, q)}
                      className="mt-4 flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/20 hover:bg-blue-500/20">
                      <PlayCircle className="w-4 h-4" /> Practice this scenario
                      with AI
                    </button>
                  )}
                </div>
              </div>

              {activeSimulator === idx && (
                <div className="bg-slate-950/50 border-t border-slate-700/50 p-6 animate-in slide-in-from-top-2 fade-in duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                      <Bot className="w-4 h-4" /> Candidate AI Activated
                    </div>
                    <button
                      onClick={() => setActiveSimulator(null)}
                      className="text-xs text-slate-500 hover:text-slate-300 font-bold bg-slate-800 px-3 py-1 rounded-md">
                      End Session
                    </button>
                  </div>

                  {/* Active Chat Log */}
                  <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {chatHistory.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex ${msg.role === "interviewer" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`text-sm rounded-2xl px-5 py-3 max-w-[85%] font-medium shadow-md ${
                            msg.role === "interviewer"
                              ? "bg-blue-600 text-white rounded-tr-sm"
                              : "bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-sm"
                          }`}>
                          {msg.content}
                        </div>
                      </div>
                    ))}

                    {/* Loading indicator when AI is typing */}
                    {isSimulating && (
                      <div className="flex justify-start">
                        <div className="bg-slate-800 text-slate-400 text-sm rounded-2xl rounded-tl-sm px-5 py-3 max-w-[85%] font-medium border border-slate-700 flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
                          Candidate is thinking...
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input Box */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ask the candidate a follow-up question..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-4 pl-5 pr-14 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      disabled={isSimulating}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={isSimulating || !chatInput.trim()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white rounded-lg transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
