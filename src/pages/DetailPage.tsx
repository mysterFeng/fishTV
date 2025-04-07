import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import VideoDetail from '../components/VideoDetail';

// In a real application, this would come from API or fetch based on ID
const getVideoData = (id: string) => {
  // This is just a placeholder - in a real app, you would fetch the data based on the ID
  return {
    id,
    title: '斗破苍穹年番',
    coverUrl: 'https://ext.same-assets.com/1324623394/3930992340.jpeg',
    year: '2022',
    area: '内地',
    type: '国产动漫',
    description: '三年之约后，萧炎终于在迦南学院见到了薰儿，此后他广交挚友并成立磐门；为继续提升实力以三上云岚宗为父复仇，他以身犯险深入天焚炼气塔吞噬陨落心炎……',
    episodeCount: 141,
  };
};

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const videoId = id || '52937'; // Default ID if none provided
  const videoData = getVideoData(videoId);

  return (
    <Layout>
      <VideoDetail
        id={videoData.id}
        title={videoData.title}
        coverUrl={videoData.coverUrl}
        year={videoData.year}
        area={videoData.area}
        type={videoData.type}
        description={videoData.description}
        episodeCount={videoData.episodeCount}
      />
    </Layout>
  );
};

export default DetailPage;
