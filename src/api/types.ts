export type Video = {
  type_name: string;
  vod_actor: string;
  vod_area: string;
  vod_content: string;
  vod_director: string;
  vod_id: number;
  vod_lang: string;
  vod_name: string;
  vod_pic: string;
  vod_play_url: string;
  vod_score: number;
  vod_year: string;
};

export interface ApiResponse<T> {
  code: number;
  msg: string;
  page: number;
  pagecount: number;
  limit: number;
  total: number;
  list: T[];
}

export interface VideoListParams {
  ac?: string;
  pg?: number;
  pagesize?: number;
  t?: number;
  [key: string]: any;
} 