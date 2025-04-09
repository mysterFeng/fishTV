import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/Layout';
import Banner from './components/Banner';
import ContentSection from './components/ContentSection';
import DetailPage from './pages/DetailPage';
import PlayPage from './pages/PlayPage';
import SearchResultsPage from './pages/SearchResultsPage';
import { bannerData, trendingContent, tvContent, animeContent } from './data/sampleData';
import { getVideoList } from './api/video';
import { Video } from './api/types';

// Homepage Component
const HomePage = () => {
  const [movieContent, setMovieContent] = useState<Video[]>([]);
  const [tvContent, setTvContent] = useState<Video[]>([]);
  const [animeContent, setAnimeContent] = useState<Video[]>([]);
  const [varietyContent, setVarietyContent] = useState<Video[]>([]);
  const [movieLoading, setMovieLoading] = useState(true);
  const [tvLoading, setTvLoading] = useState(true);
  const [animeLoading, setAnimeLoading] = useState(true);
  const [varietyLoading, setVarietyLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getVideoList({ t: 6 });
        setMovieContent(response.list);
      } catch (error) {
        console.error('获取电影数据失败:', error);
      } finally {
        setMovieLoading(false);
      }
    };

    const fetchTvShows = async () => {
      try {
        const response = await getVideoList({ t: 13 });
        setTvContent(response.list);
      } catch (error) {
        console.error('获取电视剧数据失败:', error);
      } finally {
        setTvLoading(false);
      }
    };

    const fetchAnime = async () => {
      try {
        const response = await getVideoList({ t: 60 });
        setAnimeContent(response.list);
      } catch (error) {
        console.error('获取动漫数据失败:', error);
      } finally {
        setAnimeLoading(false);
      }
    };

    const fetchVariety = async () => {
      try {
        const response = await getVideoList({ t: 38 });
        setVarietyContent(response.list);
      } catch (error) {
        console.error('获取综艺数据失败:', error);
      } finally {
        setVarietyLoading(false);
      }
    };

    fetchMovies();
    fetchTvShows();
    fetchAnime();
    fetchVariety();
  }, []);

  return (
    <Layout>
      <Banner
        title={bannerData.title}
        imageUrl={bannerData.imageUrl}
        description={bannerData.description}
      />

      <ContentSection
        title="电影"
        items={movieContent}
        seeMoreLink="/movies"
        loading={movieLoading}
      />

      <ContentSection
        title="综艺"
        items={varietyContent}
        seeMoreLink="/variety"
        loading={varietyLoading}
      />

      <ContentSection
        title="电视剧"
        items={tvContent}
        seeMoreLink="/tv"
        loading={tvLoading}
      />

      <ContentSection
        title="动漫"
        items={animeContent}
        seeMoreLink="/anime"
        loading={animeLoading}
      />
    </Layout>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        {/* Update the path pattern to match FreeOK's URL structure */}
        <Route path="/play/:id/:episode?" element={<PlayPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
