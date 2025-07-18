import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Home,
  FileText,
  Search,
  BarChart3,
  Users,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CurrentTime from "@/components/CurrentTime";

// 임시 사용자 정보 (실제 애플리케이션에서는 로그인 시스템에서 가져옴)
const currentUser = {
  userName: "김대희",
  role: "관리자", // '접수자', '관리자', '일반사용자' 중 하나로 설정하여 테스트
};

// 역할별 메뉴 접근 권한 (실제 애플리케이션에서는 DB 또는 설정 파일에서 가져옴)
const userAuth = {
  접수자: ["home", "register", "search"],
  관리자: ["home", "register", "search", "manage", "report", "users"],
  일반사용자: ["home", "search"],
};

const menuItem = [
  {
    id: "home",
    name: "Home",
    icon: <Home className="h-4 w-4" />,
    auth: ["접수자", "관리자", "일반사용자"],
    path: "/home"
  },
  {
    id: "register",
    name: "VOC 등록",
    icon: <FileText className="h-4 w-4" />,
    auth: ["접수자", "관리자"],
    path: "/register"
  },
  {
    id: "search",
    name: "VOC 조회",
    icon: <Search className="h-4 w-4" />,
    auth: ["접수자", "관리자", "일반사용자"],
    path: "/search"
  },
  {
    id: "manage",
    name: "VOC 관리",
    icon: <Settings className="h-4 w-4" />,
    auth: ["관리자"],
    path: "/manage"
  },
  {
    id: "report",
    name: "Report",
    icon: <BarChart3 className="h-4 w-4" />,
    auth: ["관리자"],
    path: "/report"
  },
  {
    id: "users",
    name: "사용자 관리",
    icon: <Users className="h-4 w-4" />,
    auth: ["관리자"],
    path: "/users"
  },
];

const Header = ({ activeMenu, setActiveMenu }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로에 따라 활성 메뉴 설정
  useEffect(() => {
    const currentPath = location.pathname;
    const menu = menuItem.find(item => item.path === currentPath);
    if (menu) {
      setActiveMenu(menu.id);
    }
  }, [location.pathname, setActiveMenu]);

  const handleMenuClick = (item) => {
    setActiveMenu(item.id);
    navigate(item.path);
  };

  return (
    <div className="bg-gradient-to-r to-orange-100 from-orage-200  border-b flex items-center text-3xl leading-none">
      {/* 로고 */}
      <img src="/src/images/logo.png" className="pl-3 w-24 h-auto"/>
      <div className="flex flex-col flex-shrink-0 text-left pl-3 pt-2">
        {/* <span className="text-amber-700 font-bold">CSPI</span> */}
        <span className="text-gray-600">Service Hub</span>
      </div>

      {/* 메인 메뉴 */}
      <div className="flex-1 w-auto justify-center">
        <nav className="hidden lg:flex space-x-3 justify-center">
          {menuItem
            .filter((item) => userAuth[currentUser.role]?.includes(item.id))
            .map((item) => (
              <Button
                key={item.id}
                className={`w-28 gap-2 border border-gray-200 shadow-sm text-2xl ${
                  activeMenu === item.id
                    ? "text-white bg-orange-400 hover:bg-orange-600 border-orange-500"
                    : "text-gray-700 bg-white hover:bg-orange-50 hover:border-orange-300"
                }`}
                onClick={() => handleMenuClick(item)}
              >
                {item.icon}
                {item.name}
              </Button>
            ))}
        </nav>
      </div>

      {/* 시간 및 사용자 정보 */}
      <div className="flex flex-shrink-0 text-right flex-col justify-end item-end space-y-1 pr-5 text-gray-600 ">
        <div className="flex flex-between text-2xl">
          현재 시간 : <CurrentTime />
        </div>
        <div className="flex flex-between justify-end space-x-4 text-2xl">
          <div className="bg-blue-100 text-orange-700 w-full rounded-2xl text-center">
            {currentUser.userName}
          </div>
          <div className="bg-gray-100 text-gray-700 w-full rounded-2xl text-center">
            {currentUser.role}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
