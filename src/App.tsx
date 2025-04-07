import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/Layout';
import Banner from './components/Banner';
import ContentSection from './components/ContentSection';
import DetailPage from './pages/DetailPage';
import PlayPage from './pages/PlayPage';
import { bannerData, trendingContent, movieContent, tvContent, animeContent } from './data/sampleData';

// Homepage Component
const HomePage = () => (
  <Layout>
    <Banner
      title={bannerData.title}
      imageUrl={bannerData.imageUrl}
      description={bannerData.description}
    />

    <ContentSection
      title="正在热映"
      items={trendingContent}
      seeMoreLink="/trending"
    />

    <ContentSection
      title="电影"
      items={movieContent}
      seeMoreLink="/movies"
    />

    <ContentSection
      title="电视剧"
      items={tvContent}
      seeMoreLink="/tv"
    />

    <ContentSection
      title="动漫"
      items={animeContent}
      seeMoreLink="/anime"
    />
  </Layout>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        {/* Update the path pattern to match FreeOK's URL structure */}
        <Route path="/play/:id" element={<PlayPage />} />
      </Routes>
    </Router>
  );
}

export default App;
