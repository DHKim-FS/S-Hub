import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, ChevronDown, ChevronUp, Calendar, User, FileText } from "lucide-react";

// 임시 VOC 데이터 (실제 애플리케이션에서는 API에서 가져옴)
const mockVocData = [
  {
    id: "VOC001",
    title: "서비스 접속 오류 발생",
    content: "오늘 오전 9시부터 서비스에 접속할 수 없습니다. 로그인 화면에서 '연결할 수 없음' 오류가 발생하고 있습니다. 사용자들이 업무에 지장을 받고 있어 긴급 조치가 필요합니다.",
    registrant: "김철수",
    registrationTime: "2024-01-15 09:30:00",
    status: "처리중",
    priority: "높음"
  },
  {
    id: "VOC002",
    title: "결제 시스템 오류",
    content: "신용카드 결제 시 '결제 처리 중 오류가 발생했습니다'라는 메시지가 나타나며 결제가 완료되지 않습니다. 여러 고객이 동일한 문제를 보고하고 있습니다.",
    registrant: "이영희",
    registrationTime: "2024-01-15 10:15:00",
    status: "접수완료",
    priority: "높음"
  },
  {
    id: "VOC003",
    title: "모바일 앱 로딩 속도 개선 요청",
    content: "모바일 앱의 초기 로딩 시간이 너무 오래 걸립니다. 현재 평균 15초 정도 소요되는데, 이를 5초 이내로 단축해주시기 바랍니다.",
    registrant: "박민수",
    registrationTime: "2024-01-15 11:00:00",
    status: "검토중",
    priority: "보통"
  },
  {
    id: "VOC004",
    title: "데이터 백업 요청",
    content: "지난 3개월간의 거래 데이터를 엑셀 파일로 백업해주시기 바랍니다. 회계 정산을 위해 필요합니다.",
    registrant: "최지영",
    registrationTime: "2024-01-15 13:45:00",
    status: "완료",
    priority: "낮음"
  },
  {
    id: "VOC005",
    title: "사용자 권한 변경 요청",
    content: "부서 이동으로 인해 사용자 권한을 변경해주시기 바랍니다. 기존: 일반사용자 → 변경: 관리자 권한으로 업그레이드가 필요합니다.",
    registrant: "정수민",
    registrationTime: "2024-01-15 14:20:00",
    status: "처리중",
    priority: "보통"
  },
  {
    id: "VOC006",
    title: "시스템 다운타임 공지",
    content: "정기 시스템 점검을 위해 내일 새벽 2시부터 4시까지 서비스가 중단됩니다. 사전에 사용자들에게 공지해주시기 바랍니다.",
    registrant: "한동훈",
    registrationTime: "2024-01-15 15:10:00",
    status: "접수완료",
    priority: "높음"
  },
  {
    id: "VOC007",
    title: "보고서 생성 기능 오류",
    content: "월간 보고서 생성 시 데이터가 누락되거나 잘못 표시되는 문제가 발생합니다. 특히 지난달 데이터가 현재 달로 표시되는 오류가 있습니다.",
    registrant: "송미영",
    registrationTime: "2024-01-15 16:30:00",
    status: "검토중",
    priority: "보통"
  },
  {
    id: "VOC008",
    title: "이메일 알림 설정 변경",
    content: "VOC 등록 시 이메일 알림을 받지 않도록 설정을 변경해주시기 바랍니다. 현재 너무 많은 알림이 오고 있어 업무에 지장을 받고 있습니다.",
    registrant: "윤서연",
    registrationTime: "2024-01-15 17:00:00",
    status: "완료",
    priority: "낮음"
  },
  {
    id: "VOC009",
    title: "데이터베이스 성능 개선",
    content: "대용량 데이터 조회 시 응답 시간이 너무 오래 걸립니다. 쿼리 최적화나 인덱스 추가를 통해 성능을 개선해주시기 바랍니다.",
    registrant: "강현우",
    registrationTime: "2024-01-15 18:15:00",
    status: "처리중",
    priority: "높음"
  },
  {
    id: "VOC010",
    title: "UI/UX 개선 제안",
    content: "사용자 인터페이스를 더 직관적이고 사용하기 쉽게 개선해주시기 바랍니다. 특히 모바일 환경에서의 사용성을 개선하면 좋겠습니다.",
    registrant: "임지은",
    registrationTime: "2024-01-15 19:00:00",
    status: "검토중",
    priority: "보통"
  },
  {
    id: "VOC011",
    title: "보안 정책 업데이트",
    content: "최근 보안 위협이 증가하고 있어 비밀번호 정책을 강화하고 2단계 인증을 도입해주시기 바랍니다.",
    registrant: "김보라",
    registrationTime: "2024-01-16 09:00:00",
    status: "접수완료",
    priority: "높음"
  },
  {
    id: "VOC012",
    title: "API 연동 오류",
    content: "외부 시스템과의 API 연동에서 데이터 전송 오류가 발생하고 있습니다. 연결 상태를 확인하고 복구해주시기 바랍니다.",
    registrant: "박준호",
    registrationTime: "2024-01-16 10:30:00",
    status: "처리중",
    priority: "높음"
  }
];

const VocSearch = () => {
  const [vocList, setVocList] = useState(mockVocData);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("전체");
  const [priorityFilter, setPriorityFilter] = useState("전체");

  const itemsPerPage = 10;
  const totalPages = Math.ceil(vocList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVocList = vocList.slice(startIndex, endIndex);

  // 검색 및 필터링
  const filteredVocList = mockVocData.filter(voc => {
    const matchesSearch = voc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         voc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         voc.registrant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         voc.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "전체" || voc.status === statusFilter;
    const matchesPriority = priorityFilter === "전체" || voc.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  useEffect(() => {
    setVocList(filteredVocList);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, priorityFilter]);

  const handleVocClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "접수완료": return "bg-blue-100 text-blue-800";
      case "처리중": return "bg-yellow-100 text-yellow-800";
      case "검토중": return "bg-orange-100 text-orange-800";
      case "완료": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "높음": return "bg-red-100 text-red-800";
      case "보통": return "bg-yellow-100 text-yellow-800";
      case "낮음": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">VOC 조회</h1>
        <p className="text-gray-600">등록된 VOC 목록을 조회하고 관리할 수 있습니다.</p>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="search" className="text-2xl font-medium text-gray-700 mb-2 block">
              검색
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="search"
                placeholder="제목, 내용, 등록자, VOC ID 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 "
              />
            </div>
          </div>

          <div>
            <Label htmlFor="status" className="text-2xl font-medium text-gray-700 mb-2 block">
              상태
            </Label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="전체">전체</option>
              <option value="접수완료">접수완료</option>
              <option value="처리중">처리중</option>
              <option value="검토중">검토중</option>
              <option value="완료">완료</option>
            </select>
          </div>

          <div>
            <Label htmlFor="priority" className="text-2xl font-medium text-gray-700 mb-2 block">
              우선순위
            </Label>
            <select
              id="priority"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="전체">전체</option>
              <option value="높음">높음</option>
              <option value="보통">보통</option>
              <option value="낮음">낮음</option>
            </select>
          </div>

          <div className="flex items-end">
            <Button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("전체");
                setPriorityFilter("전체");
              }}
              className="w-full bg-gray-500 hover:bg-gray-600"
            >
              초기화
            </Button>
          </div>
        </div>
      </div>

      {/* VOC 리스트 */}
      <div className="space-y-4">
        {currentVocList.map((voc) => (
          <Card
            key={voc.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
              expandedId === voc.id ? 'ring-2 ring-orange-500' : ''
            }`}
            onClick={() => handleVocClick(voc.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-lg text-gray-800">{voc.title}</CardTitle>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(voc.status)}`}>
                      {voc.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(voc.priority)}`}>
                      {voc.priority}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 text-2xl text-gray-600">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>{voc.id}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{voc.registrant}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{voc.registrationTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  {expandedId === voc.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
            </CardHeader>

            {expandedId === voc.id && (
              <CardContent className="pt-0">
                <div className="border-t border-gray-200 p-3 bg-amber-50 rounded-xl">
                  <h4 className="font-medium text-gray-700 mb-2">상세 내용</h4>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {voc.content}
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <Button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
          >
            이전
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              onClick={() => setCurrentPage(page)}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              className="w-10"
            >
              {page}
            </Button>
          ))}

          <Button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm"
          >
            다음
          </Button>
        </div>
      )}

      {/* 결과 요약 */}
      <div className="mt-6 text-center text-2xl ">
        총 {vocList.length}개의 VOC 중 {startIndex + 1}-{Math.min(endIndex, vocList.length)}번째 항목을 보여주고 있습니다.
      </div>
    </div>
  );
};

export default VocSearch;
