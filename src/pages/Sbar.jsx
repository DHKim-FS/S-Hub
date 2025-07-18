import React from "react";
import {
  Clock,
  Home,
  FileText,
  Search,
  Settings,
  BarChart3,
  Users,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Paperclip,
  Calendar,
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
  Pause,
  TrendingUp,
  Zap,
} from "lucide-react";

const Sbar = () => {
  const notice = [
    { id: "1", body: "Toy PJT 시작합니다." },
    { id: "2", body: "Toy PJT 진행 중입니다." },
    { id: "3", body: "Toy PJT 끝났습니다용." },
  ];

  const colorClasses = {
    red: "from-red-100 to-red-200",
    blue: "from-blue-100 to-blue-200",
    green: "from-green-100 to-green-200",
    // 필요한 색상 추가
  };

  const vocStats = [
    {
      label: "접수완료",
      count: 12,
      percentage: 60,
      color: "text-orange-600",
      bgGradient: "from-orange-500 to-pink-500",
    },
    {
      label: "처리중",
      count: 8,
      percentage: 40,
      color: "text-amber-600",
      bgGradient: "from-amber-500 to-orange-500",
    },
    {
      label: "완료",
      count: 25,
      percentage: 100,
      color: "text-emerald-600",
      bgGradient: "from-emerald-500 to-teal-500",
    },
  ];

  const quickLink = [
    { url: "https://www.google.com", name: "Google", color: "blue" },
    { url: "https://www.naver.com", name: "Naver", color: "red" },
  ];

  const activeo = !!notice.length;

  return (
    <div className="pt-5 flex flex-col h-full text-3xl bg-gradient-to-tr to-gray-50 from-orange-100 border-1">
      <div className="flex flex-col mb-3">
        <div className="flex items-center justify-between mb-2 ml-3">
          <h3 className="text-lg font-bold text-gray-800 flex items-center">
            <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            VOC 처리 현황
          </h3>
          {/* <Zap className="w-5 h-5 text-orange-500 animate-pulse" /> */}
        </div>

        <div className="p-2 space-y-2">
          {vocStats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white/70 backdrop-blur-sm rounded-2xl pl-5 pr-5 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-orange-50"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-gray-700">
                  {stat.label}
                </span>
                <span className={`text-2xl font-bold ${stat.color}`}>
                  {stat.count}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${stat.bgGradient} transition-all duration-1000 ease-out`}
                  style={{ width: `${stat.percentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-sm text-gray-500">
                  {stat.percentage}% 완료
                </span>
                {/* <Star className="w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" /> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeo && (
        <div className="space-y-2 flex flex-col items-center justify-center text-xl">
          <h3 className="font-bold text-slate-700 mb-1 flex items-center gap-2">
            <FileText className="text-indigo-500 flex justify-center items-center " />
            공지사항
          </h3>
          {notice.map((data) => (
            <div
              key={data.id}
              className="mb-1 flex items-center text-slate-700 hover:text-slate-500"
            >
              {data.id}.{data.body}
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-col mb-auto items-center justify-center space-y-1 text-xl">
        <div className="">Quick Link</div>
        <div className="flex flex-col w-25 space-y-1">
          {quickLink.map((data) => (
            <a
              className={`rounded-xl text-center bg-gradient-to-r ${
                colorClasses[data.color]
              }`}
              href={data.url}
            >
              {data.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sbar;
