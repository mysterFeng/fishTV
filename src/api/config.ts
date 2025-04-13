export const API_CONFIG = {
  baseURL: 'https://tv.codebug.icu/heimuer/api.php',
  timeout: 10000,
};

export const VIDEO_SOURCES = {
  moyu: {
    name: '摸鱼云️',
    url: 'https://tv.codebug.icu/heimuer/api.php'
  },
  feifan: {
    name: '非凡云',
    url: 'https://tv.codebug.icu/ikun/api.php'
  },
  modu: {
    name: '魔都云',
    url: 'https://tv.codebug.icu/modu/api.php'
  },
  youzhi: {
    name: '优质云',
    url: 'https://tv.codebug.icu/youzhi/inc/apijson.php'
  },
  subocaiji: {
    name: '速播云',
    url: 'https://tv.codebug.icu/subocaiji/api.php'
  },

};

export const setBaseURL = (url: string) => {
  API_CONFIG.baseURL = url;
}; 