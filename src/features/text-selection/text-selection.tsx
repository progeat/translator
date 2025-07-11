import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState, type FC } from 'react';

export const TextSelection: FC = () => {
  const [selection, setSelection] = useState<string | undefined>('');
  const [position, setPosition] = useState<Record<string, number>>();
  const [isActive, setIsActive] = useState(false);

  console.log('position', position);

  const onSelectStart = () => {
    setSelection(undefined);
    setIsActive(false);
  };
  const onMouseUp = () => {
    const activeSelection = document.getSelection();
    if (!activeSelection) return;

    const text = activeSelection.toString().trim();
    if (!text) {
      setSelection(undefined);
      return;
    }

    const rect = activeSelection.getRangeAt(0).getBoundingClientRect();

    setSelection(text);
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + window.scrollY - 35,
      width: rect.width,
      height: rect.height,
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

  const onClick = () => {
    setIsActive(true);
  };

  return (
    <Box>
      {selection && position && !isActive && (
        <Button
          sx={{
            position: 'absolute',
            top: '0',
            left: '0',
            transform: `translate(${position.x - 50}px, ${position.y}px)`,
            width: '100px',
            backgroundColor: 'lightgreen',
          }}
          onClick={onClick}
        >
          Translate
        </Button>
      )}
      {isActive && selection && position && (
        <Typography
          sx={{
            position: 'absolute',
            top: '0',
            left: '0',
            transform: `translate(${position.x - 150}px, ${position.y}px)`,
            width: '300px',
            backgroundColor: 'lightgreen',
          }}
        >
          {selection}
        </Typography>
      )}
    </Box>
  );
};
