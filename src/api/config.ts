export const API_CONFIG = {
  baseURL: 'https://tv.codebug.icu/heimuer/api.php',
  timeout: 10000,
};

export const VIDEO_SOURCES = {
  moyu: {
    name: '摸鱼☁️',
    url: 'https://tv.codebug.icu/heimuer/api.php'
  },
  subocaiji: {
    name: '摸鱼🐟',
    url: 'https://tv.codebug.icu/subocaiji/api.php'
  },
  wujin: {
    name: '摸鱼🎣',
    url: 'https://tv.codebug.icu/ikun/api.php'
  },
};

export const setBaseURL = (url: string) => {
  API_CONFIG.baseURL = url;
}; 