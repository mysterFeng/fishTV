import request from './request';
import { Video, VideoListParams } from './types';

export const getVideoList = async (params: VideoListParams = {}, baseURL?: string) => {
  // 如果参数中包含wd（搜索关键词），则不带上t=6参数
  const defaultParams = params.wd ? {
    ac: 'videolist',
    pg: 1,
    pagesize: 12,
  } : {
    ac: 'videolist',
    pg: 1,
    pagesize: 12,
    t: 6,
  };

  return request<Video>('/provide/vod/', {
    ...defaultParams,
    ...params,
  }, baseURL);
};

export const getVideoDetail = async (id: string, baseURL?: string) => {
  return request<Video>('/provide/vod/', {
    ac: 'detail',
    ids: id,
  }, baseURL);
};

export const searchVideo = async (title: string, baseURL?: string) => {
  return request<Video>('/provide/vod/', {
    ac: 'videolist',
    wd: title,
  }, baseURL);
}; 