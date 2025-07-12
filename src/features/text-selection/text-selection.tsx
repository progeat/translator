import { Box } from '@mui/material';
import { useEffect, useState, type FC } from 'react';
import { Tooltip } from '../tooltip/Tooltip'; 

export const TextSelection: FC = () => {
  const [selection, setSelection] = useState<string | null>(null);
  const [position, setPosition] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const onSelectStart = () => {
    setSelection(null);
    setPosition(null);
  };

  const onMouseUp = () => {
    const activeSelection = document.getSelection();
    if (!activeSelection) return;

    const text = activeSelection.toString().trim();
    if (!text) {
      setSelection(null);
      setPosition(null);
      return;
    }

    const range = activeSelection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    setSelection(text);
    setPosition({
      x: rect.left,
      y: rect.top + window.scrollY,
      width: rect.width,
      height: rect.height
    });
  };

  useEffect(() => {
    document.addEventListener('selectstart', onSelectStart);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('selectstart', onSelectStart);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const handleClose = () => {
    setSelection(null);
    setPosition(null);
  };

  return (
    <Box>
      {selection && position && (
        <Tooltip 
          text={selection} 
          position={position}
          onClose={handleClose}
        />
      )}
    </Box>
  );
};