import React, { createContext, useContext, useState, useEffect } from 'react';

interface HistoryItem {
  id: string;
  title: string;
  imageUrl: string;
  lastWatched: Date;
  episode?: string;
  source?: string;
}

interface HistoryContextType {
  history: HistoryItem[];
  addToHistory: (item: HistoryItem) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem('watchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('watchHistory', JSON.stringify(history));
  }, [history]);

  const addToHistory = (item: HistoryItem) => {
    setHistory(prev => {
      const existingIndex = prev.findIndex(h => h.id === item.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { ...item, lastWatched: new Date() };
        return updated;
      }
      return [{ ...item, lastWatched: new Date() }, ...prev];
    });
  };

  const removeFromHistory = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <HistoryContext.Provider value={{ history, addToHistory, removeFromHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
}; 