export interface RouteMenu {
  name: string;
  path: string;
  subMenus?: RouteMenu[];
}

export const ROUTE_MENUS: RouteMenu[] = [
  { name: '홈', path: '/' },
  {
    name: '유저 관리',
    path: '/users',
    subMenus: [
      { name: '유저 목록', path: '/' },
      { name: '닉네임 관리', path: '/nickname' },
    ],
  },
  {
    name: '퀴즈 관리',
    path: '/quizzes',
    subMenus: [
      { name: '퀴즈 목록', path: '/' },
      { name: '퀴즈 추가', path: '/create' },
      { name: '퀴즈 관리', path: '/edit' },
    ],
  },
  {
    name: '에셋 관리',
    path: '/assets',
    subMenus: [
      { name: 'BGM 관리', path: '/bgm' },
      { name: '효과음 관리', path: '/sfx' },
      { name: '이미지 관리', path: '/images' },
    ],
  },
];
