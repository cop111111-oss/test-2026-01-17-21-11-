
import { SiteContent } from './types';

export const INITIAL_CONTENT: SiteContent = {
  brandName: "친환경이지그린",
  heroTitle: "그린리모델링의 미래를 선도하는 혁신 기술",
  heroSubtitle: "지속 가능한 공간과 에너지 효율의 극대화, 친환경이지그린이 제안하는 프리미엄 솔루션을 경험하십시오.",
  aboutTitle: "지구를 지키는 에너지 파트너",
  aboutDescription: "친환경이지그린은 건물의 에너지 효율을 극대화하고 탄소 배출을 최소화하는 혁신적인 솔루션을 제공합니다. 우리는 기술과 신뢰를 바탕으로 더 나은 미래를 건설합니다.",
  aboutVision: "전 세계적인 탄소중립 목표 달성을 위해 건물의 제로 에너지를 현실로 구현하는 혁신 기업이 되겠습니다.",
  contactEmail: "cop111@naver.com",
  contactPhone: "02-123-4567",
  contactAddress: "서울특별시 강남구 테헤란로 123 친환경이지그린 타워 15층",
  kakaoLink: "https://pf.kakao.com",
  instagramLink: "https://instagram.com",
  blogLink: "https://blog.naver.com",
  services: [
    {
      id: "1",
      title: "그린리모델링",
      description: "노후 건물의 단열, 창호, 설비를 개선하여 에너지 효율을 높이고 쾌적한 거주 환경을 조성합니다.",
      icon: "Home",
      imageUrl: "https://picsum.photos/seed/green1/800/600"
    },
    {
      id: "2",
      title: "건물에너지진단",
      description: "전문 진단 장비와 시뮬레이션을 통해 건물의 에너지 소요량을 정밀하게 분석하고 개선 방안을 도출합니다.",
      icon: "Activity",
      imageUrl: "https://picsum.photos/seed/green2/800/600"
    },
    {
      id: "3",
      title: "제로에너지빌딩(ZEB)",
      description: "신축 및 증축 건물을 대상으로 에너지 자립률을 극대화하는 최적의 ZEB 인증 솔루션을 제공합니다.",
      icon: "Zap",
      imageUrl: "https://picsum.photos/seed/green3/800/600"
    }
  ],
  portfolio: [
    {
      id: "p1",
      title: "강남 A 아파트 그린리모델링",
      category: "주거시설",
      description: "단열 창호 교체 및 외벽 개선을 통해 냉난방비 35% 절감 달성",
      imageUrl: "https://picsum.photos/seed/port1/600/400"
    },
    {
      id: "p2",
      title: "인천 B 오피스 ZEB 인증 컨설팅",
      category: "업무시설",
      description: "신재생 에너지 도입을 통한 제로에너지빌딩 3등급 인증 획득",
      imageUrl: "https://picsum.photos/seed/port2/600/400"
    },
    {
      id: "p3",
      title: "세종 C 공공기관 에너지 진단",
      category: "공공기관",
      description: "종합 진단을 통한 탄소배출권 확보 및 연간 2억원 에너지 비용 절감",
      imageUrl: "https://picsum.photos/seed/port3/600/400"
    }
  ]
};
