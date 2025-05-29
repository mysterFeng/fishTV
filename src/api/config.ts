export const API_CONFIG = {
  baseURL: 'http://localhost:8080/heimuer/api.php',
  timeout: 10000,
};

export const VIDEO_SOURCES = {
  moyu: {
    name: '摸鱼云️',
    url: 'http://localhost:8080/heimuer/api.php'
  },
  feifan: {
    name: '非凡云',
    url: 'http://localhost:8080/ikun/api.php'
  },
  modu: {
    name: '魔都云',
    url: 'http://localhost:8080/modu/api.php'
  },
  youzhi: {
    name: '优质云',
    url: 'http://localhost:8080/youzhi/inc/apijson.php'
  },
  subocaiji: {
    name: '速播云',
    url: 'http://localhost:8080/subocaiji/api.php'
  },
};

export const setBaseURL = (url: string) => {
  API_CONFIG.baseURL = url;
};