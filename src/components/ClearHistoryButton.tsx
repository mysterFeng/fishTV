import React from 'react';
import { useHistory } from '../context/HistoryContext';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ClearHistoryButton: React.FC = () => {
  const { clearHistory, history } = useHistory();

  const handleClearHistory = () => {
    if (window.confirm('确定要清空所有观看历史吗？此操作不可恢复。')) {
      clearHistory();
    }
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      color="error"
      startIcon={<DeleteIcon />}
      onClick={handleClearHistory}
      sx={{ margin: '16px' }}
    >
      清空历史记录
    </Button>
  );
};

export default ClearHistoryButton; 