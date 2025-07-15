import type { StateSchema } from '@/app/providers/store-provider/config/state-schema';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Fade, IconButton, Paper, Typography } from '@mui/material';
import { useEffect, useRef, useState, type FC } from 'react';
import { useSelector } from 'react-redux';
import {
  getPosition,
  getTextSelected,
} from '../text-selection/model/selectors';
import type { Position } from '../text-selection';

export interface TooltipProps {
  onClose: () => void;
}

export const Tooltip: FC<TooltipProps> = ({ onClose }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  const position = useSelector(getPosition) as Position;
  const text = useSelector(getTextSelected);
  const { translatedText } = useSelector(
    (state: StateSchema) => state.textSelection
  );

  const [adjustedPosition, setAdjustedPosition] = useState({ top: 0, left: 0 });
  const [visible, setVisible] = useState(false);

  const calculatePosition = () => {
    if (!tooltipRef.current) return;

    const tooltipWidth = tooltipRef.current.offsetWidth;
    const tooltipHeight = tooltipRef.current.offsetHeight;

    let top = position?.y;
    let left = position?.x + position?.width / 2 - tooltipWidth / 2;

    if (left + tooltipWidth > window.innerWidth) {
      left = window.innerWidth - tooltipWidth - 10;
    } else if (left < 0) {
      left = 10;
    }

    const isBottomOverflow =
      top + tooltipHeight > window.innerHeight + window.scrollY;
    const isTopOverflow = top - tooltipHeight < window.scrollY;

    if (isBottomOverflow) {
      top = position.y - tooltipHeight - 20;
    }

    if (isTopOverflow || top < window.scrollY) {
      top = window.scrollY + 10;
    }

    if (top + tooltipHeight > window.innerHeight + window.scrollY) {
      top = window.innerHeight + window.scrollY - tooltipHeight - 10;
    }

    setAdjustedPosition({ top, left });
  };

  useEffect(() => {
    setVisible(true);
    calculatePosition();

    window.addEventListener('resize', calculatePosition);
    return () => window.removeEventListener('resize', calculatePosition);
  }, [position]);

  return (
    <Fade in={visible}>
      <Paper
        ref={tooltipRef}
        elevation={3}
        sx={{
          position: 'absolute',
          top: adjustedPosition.top,
          left: adjustedPosition.left,
          zIndex: 9999,
          minWidth: 200,
          maxWidth: 300,
          maxHeight: '80vh',
          overflowY: 'auto',
          p: 2,
          bgcolor: 'background.paper',
          borderRadius: '8px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
          transition: 'opacity 0.3s, transform 0.3s',
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" fontWeight="bold">
            Translation
          </Typography>
          <IconButton
            size="small"
            onClick={() => {
              setVisible(false);
              setTimeout(onClose, 300);
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Typography variant="body1" mt={1}>
          {text}
        </Typography>

        <Box mt={2} textAlign="center">
          <Typography variant="caption" color="text.secondary">
            {translatedText ? translatedText : 'Translation will appear here'}
          </Typography>
        </Box>
      </Paper>
    </Fade>
  );
};
