export const categories = [
  { id: "boiler", label: "보일러", en: "Boiler" },
  { id: "plumbing", label: "배관", en: "Plumbing" },
  { id: "leak", label: "누수", en: "Leak" },
  { id: "drain", label: "하수구", en: "Drain" },
  { id: "septic", label: "정화조", en: "Septic" },
  { id: "repair", label: "집수리", en: "Repair" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export const settingsCopy = {
  businessName: "태양설비공사",
  nameEn: "TAEYANG MECHANICAL",
  phone: "010-5369-5318",
  region: "강원도 홍천",
  blogUrl: "https://blog.naver.com/kim5369kim",
  about:
    "보일러, 배관, 누수, 하수구, 정화조, 집수리까지. 홍천 어디든 찾아가 원인을 확인하고 직접 시공하는 설비업체입니다.",
};

export const heroCopy = {
  lead: "보일러부터 정화조까지, 집 설비는 한 곳에 맡기세요.\n홍천 어디든 직접 찾아가 시공합니다.",
};

export const aboutCopy = {
  headline: "설비는 묻거나 가리고 나면\n다시 열기 어렵습니다.",
  description:
    "그래서 태양설비는 시공 전에 집 구조와 사용량, 들어갈 자재를 먼저 확인하고 필요한 만큼 제대로 시공합니다.",
  photoCaption: "실제 시공 현장 · 배관 매설",
  principles: [
    { title: "원인부터 짚습니다", text: "막힘, 누수, 보일러 문제인지 먼저 확인하고 증상만 보고 덮지 않습니다." },
    { title: "집에 맞춰 시공합니다", text: "공간 크기와 사용량, 배관 길이와 자재를 집마다 따져 정합니다." },
    { title: "합리적인 비용과 사후 관리", text: "필요한 공사만 안내하고, 시공 후 A/S도 같은 번호로 받습니다." },
  ],
  realPhoto: { logNo: "223051143138", sortOrder: 4 },
};

export const contactCopy = {
  title: ["설비가 고장 났다면,", "바로 전화 주세요."],
  text: "난방이 안 될 때, 물이 샐 때, 하수구가 막혔을 때 \n증상과 위치만 말씀해 주시면 홍천 어디든 찾아가 확인합니다.",
};

export const nav = [
  { id: "services", href: "/#services", label: "서비스", en: "Services" },
  { id: "works", href: "/projects", label: "시공 사례", en: "Works" },
  { id: "about", href: "/#about", label: "소개", en: "About" },
  { id: "contact", href: "/#contact", label: "문의", en: "Contact" },
] as const;

export type ProjectCopy = {
  logNo: string;
  slug: string;
  title: string;
  summary: string;
  content: string[];
  category: CategoryId;
  date: string;
  featuredRank: number | null;
  coverSortOrder: number;
  /** 프레임 안에 사람이 보여, 공개 전 확인이 필요한 원본 순번 */
  peopleInFrame: number[];
};

export const projectsCopy: ProjectCopy[] = [
  {
    logNo: "223051143138",
    slug: "buried-piping-2023",
    title: "터파기 후 배관 매설",
    summary: "구간을 파고 배관을 넣은 뒤 되메우기 전 상태까지 남은 현장입니다.",
    content: [
      "굴착 장비로 배관이 지나갈 자리를 열고, 바닥에 배관을 내려 이었습니다.",
      "사진에는 긴 트렌치, 연결된 배관, 굴착기가 나란히 보입니다.",
      "되메우기 전 배관 위치와 연결부가 드러나 있어, 매설 과정을 순서대로 볼 수 있습니다.",
    ],
    category: "plumbing",
    date: "2023-05-16",
    featuredRank: 1,
    coverSortOrder: 5,
    peopleInFrame: [6, 8, 11, 12],
  },
  {
    logNo: "223051132816",
    slug: "boiler-install-2023",
    title: "보일러와 난방 배관 설치",
    summary: "보일러 본체와 보온재로 감싼 배관을 함께 설치한 현장입니다.",
    content: [
      "실내에 보일러를 두고, 난방과 온수로 이어지는 배관을 연결했습니다.",
      "배관 일부는 파란색 보온재로 감싸 있고, 본체 옆에는 급탕 라인이 보입니다.",
      "좁은 기계실 안에서 본체 위치와 배관 방향을 맞춰 시공한 기록입니다.",
    ],
    category: "boiler",
    date: "2023-04-04",
    featuredRank: 2,
    coverSortOrder: 7,
    peopleInFrame: [8],
  },
  {
    logNo: "223051136448",
    slug: "septic-burial-2023",
    title: "정화조 매설과 배관 연결",
    summary: "넓은 부지에서 정화조를 묻고, 오수와 하수로 이어지는 배관을 붙인 현장입니다.",
    content: [
      "땅을 연 자리에 검정색과 파란색 정화조를 각각 앉혔습니다.",
      "탱크 옆으로 하얀 배관이 길게 이어지고, 맨홀과 연결부가 함께 보입니다.",
      "매설 뒤 상부 마감 전 단계라, 탱크 위치와 배관 경로가 사진에 남아 있습니다.",
    ],
    category: "septic",
    date: "2023-03-24",
    featuredRank: 3,
    coverSortOrder: 8,
    peopleInFrame: [11],
  },
  {
    logNo: "223051129360",
    slug: "home-repair-2023",
    title: "주택 외부 수리",
    summary: "단층과 복층 주택 외부를 손본 현장입니다. 외벽과 설비 연결부가 사진에 남아 있습니다.",
    content: [
      "주택 바깥에서 외벽과 설비 쪽을 함께 살핀 작업입니다.",
      "단층 건물과 복층 건물이 섞여 있고, 일부는 장비가 집 옆에 선 채로 진행됐습니다.",
      "내부 마감이 아니라, 집 밖에서 접근하는 수리 기록이 중심입니다.",
    ],
    category: "repair",
    date: "2023-03-21",
    featuredRank: 4,
    coverSortOrder: 5,
    peopleInFrame: [3],
  },
  {
    logNo: "223051139168",
    slug: "drain-clearing-2023",
    title: "막힌 배수 구간 확인",
    summary: "변기와 배수관 안을 확인하고, 막힌 구간을 다룬 현장입니다.",
    content: [
      "변기 주변과 배수관 내부를 열어 막힘 위치를 확인했습니다.",
      "관 안쪽 사진과 맨홀 쪽이 함께 있어, 실내 기구에서 바깥 관까지 이어 본 작업입니다.",
      "표면만 닦지 않고 관 내부를 본 뒤 처리한 기록입니다.",
    ],
    category: "drain",
    date: "2023-04-20",
    featuredRank: 5,
    coverSortOrder: 6,
    peopleInFrame: [],
  },
  {
    logNo: "222934122549",
    slug: "water-line-2022",
    title: "수도관 매설",
    summary: "길게 판 구간에 수도관을 넣고, 되메우기 전 연결부를 남긴 현장입니다.",
    content: [
      "직선에 가깝게 판 트렌치 안에 수도관을 내렸습니다.",
      "이음과 맨홀 주변이 따로 찍혀 있어, 매설 깊이와 연결 위치를 확인할 수 있습니다.",
      "포장 전 단계의 수도 배관 공사 기록입니다.",
    ],
    category: "plumbing",
    date: "2022-11-21",
    featuredRank: 6,
    coverSortOrder: 2,
    peopleInFrame: [3],
  },
  {
    logNo: "223053564717",
    slug: "house-septic-2023",
    title: "주택 옆 정화조 설치",
    summary: "주택 옆을 파고 정화조를 앉힌 뒤, 하얀 배관을 연결한 현장입니다.",
    content: [
      "건물 바로 옆 터파기 자리에 정화조를 두고 배관을 이었습니다.",
      "탱크 상부와 여러 갈래로 뻗은 배관이 한 화면에 보입니다.",
      "주택 단위로 정화조와 배관을 함께 놓은 시공입니다.",
    ],
    category: "septic",
    date: "2023-03-23",
    featuredRank: null,
    coverSortOrder: 1,
    peopleInFrame: [],
  },
  {
    logNo: "222934168247",
    slug: "boiler-replace-2022",
    title: "벽걸이 보일러 교체",
    summary: "벽돌 외벽에 보일러를 다시 달고, 아래 배관을 정리한 현장입니다.",
    content: [
      "외벽의 기존 보일러를 교체하고 급수·난방 배관을 다시 연결했습니다.",
      "벽걸이 본체와 그 아래로 내려가는 배관이 사진의 중심입니다.",
      "실내 기계실이 아니라 건물 바깥 벽에 붙은 설치 기록입니다.",
    ],
    category: "boiler",
    date: "2022-11-21",
    featuredRank: null,
    coverSortOrder: 3,
    peopleInFrame: [],
  },
  {
    logNo: "222934161114",
    slug: "water-service-2022",
    title: "수도 배관 매설",
    summary: "땅을 열고 수도 배관을 넣은 현장입니다. 맨홀과 트렌치가 함께 남아 있습니다.",
    content: [
      "수도가 지나갈 자리를 파고 관을 내렸습니다.",
      "맨홀 내부와 트렌치 사진이 있어, 관이 어디서 이어지는지 볼 수 있습니다.",
      "포장 전 수도 인입과 매설을 다룬 기록입니다.",
    ],
    category: "plumbing",
    date: "2022-11-21",
    featuredRank: null,
    coverSortOrder: 2,
    peopleInFrame: [1, 2],
  },
  {
    logNo: "222934154517",
    slug: "drain-line-2022",
    title: "하수관 내부 점검",
    summary: "하수관 안을 확인하고 막힘을 다룬 현장입니다.",
    content: [
      "관 내부를 촬영해 막힌 상태와 관 벽을 확인했습니다.",
      "바깥 트렌치와 관 안쪽 사진이 한 작업으로 묶여 있습니다.",
      "기구를 교체하기보다 관 자체를 본 배수 작업입니다.",
    ],
    category: "drain",
    date: "2022-11-21",
    featuredRank: null,
    coverSortOrder: 2,
    peopleInFrame: [2],
  },
  {
    logNo: "222934148436",
    slug: "house-repair-2022",
    title: "주택 설비 수리",
    summary: "주택 외부와 배관 연결부를 수리한 현장입니다.",
    content: [
      "집 옆에서 설비 연결부와 외부를 함께 손봤습니다.",
      "장비가 건물 옆에 서 있고, 배관이 드러난 구간이 있습니다.",
      "신축 매설이 아니라 이미 있는 집을 고친 기록입니다.",
    ],
    category: "repair",
    date: "2022-11-21",
    featuredRank: null,
    coverSortOrder: 2,
    peopleInFrame: [2, 4],
  },
  {
    logNo: "222934140702",
    slug: "site-utilities-2022",
    title: "부지 배관 공사",
    summary: "건물 옆 트렌치에 배관을 넣고, 콘크리트 바닥을 만든 현장입니다.",
    content: [
      "건물 옆으로 땅을 파고 배관을 배치했습니다.",
      "일부 구간은 콘크리트로 덮기 전후가 따로 찍혀 있습니다.",
      "부지 단위로 설비 배관을 넣은 공사 기록입니다.",
    ],
    category: "leak",
    date: "2022-11-21",
    featuredRank: null,
    coverSortOrder: 4,
    peopleInFrame: [4],
  },
  {
    logNo: "222934129489",
    slug: "septic-tank-2022",
    title: "정화조와 연결 배관",
    summary: "파란색 정화조와 노란 뚜껑, 이어진 배관이 보이는 현장입니다.",
    content: [
      "정화조 본체와 상부 뚜껑, 옆으로 빠지는 배관을 함께 시공했습니다.",
      "탱크가 땅에 앉은 상태와 배관 연결부가 사진에 남아 있습니다.",
      "주택 부지에서 정화조를 놓고 관을 이은 기록입니다.",
    ],
    category: "septic",
    date: "2022-11-21",
    featuredRank: null,
    coverSortOrder: 1,
    peopleInFrame: [],
  },
];

export const servicesCopy: {
  category: CategoryId;
  name: string;
  description: string;
  keywords: string[];
  cover: { logNo: string; sortOrder: number };
}[] = [
  {
    category: "boiler",
    name: "보일러 설치 · 교체",
    description: "집 구조와 공간에 맞는 보일러를 고르고, 난방·온수 배관까지 연결해 바로 따뜻하게 쓰시도록 설치합니다.",
    keywords: ["본체 교체", "난방 배관", "온수"],
    cover: { logNo: "223051132816", sortOrder: 7 },
  },
  {
    category: "plumbing",
    name: "배관 · 수도설비",
    description: "배관 길이와 자재를 먼저 정한 뒤 땅을 파고 묻습니다. 물이 막힘 없이 들어오고 빠지도록 연결합니다.",
    keywords: ["매설", "수도 인입", "트렌치"],
    cover: { logNo: "223051143138", sortOrder: 5 },
  },
  {
    category: "leak",
    name: "누수 확인 · 보수",
    description: "어디서 새는지부터 찾고, 그 구간 배관을 고치거나 바꿉니다. 같은 자리가 다시 새지 않게 마무리합니다.",
    keywords: ["누수 위치", "배관 교체", "보수"],
    cover: { logNo: "222934140702", sortOrder: 4 },
  },
  {
    category: "drain",
    name: "하수구 뚫음",
    description: "막힌 원인과 위치를 확인하고, 장비로 관을 상하지 않게 뚫습니다. 물 쓰는 불편을 바로 덜어 드립니다.",
    keywords: ["관 내부", "맨홀", "배수"],
    cover: { logNo: "223051139168", sortOrder: 5 },
  },
  {
    category: "septic",
    name: "정화조 시공",
    description: "쓰는 인원과 용량에 맞는 정화조를 고르고, 묻기부터 오수 배관 연결, 상부 마감까지 한 번에 시공합니다.",
    keywords: ["매설", "배관 연결", "상부 마감"],
    cover: { logNo: "223051136448", sortOrder: 8 },
  },
  {
    category: "repair",
    name: "집수리",
    description: "오래 산 집에서 생긴 문제를 원인부터 확인하고, 바꿀 곳은 확실히 바꿔 다시 문제가 생기지 않게 고칩니다.",
    keywords: ["주택 외부", "연결부", "부분 수리"],
    cover: { logNo: "223051129360", sortOrder: 5 },
  },
];

export function categoryLabel(id: CategoryId) {
  return categories.find((item) => item.id === id)?.label ?? id;
}

export function blogUrl(logNo: string) {
  return `https://blog.naver.com/kim5369kim/${logNo}`;
}
