import request from './request';
import { Video, VideoListParams } from './types';

export const getVideoList = async (params: VideoListParams = {}) => {
  return request<Video>('/provide/vod/', {
    ac: 'videolist',
    pg: 0,
    pagesize: 12,
    t: 6,
    ...params,
  });
};

export const getVideoDetail = async (id: string) => {
  return request<Video>('/provide/vod/', {
    ac: 'detail',
    ids: id,
  });
}; 