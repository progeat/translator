import React, { useRef, useEffect, useState } from "react";
import { Paper, Typography, IconButton, Box, Fade } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface TooltipProps {
  text: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  onClose: () => void;
}

export const Tooltip: React.FC<TooltipProps> = ({
  text,
  position,
  onClose,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [adjustedPosition, setAdjustedPosition] = useState({ top: 0, left: 0 });
  const [visible, setVisible] = useState(false);

  const calculatePosition = () => {
    if (!tooltipRef.current) return;

    const tooltipWidth = tooltipRef.current.offsetWidth;
    const tooltipHeight = tooltipRef.current.offsetHeight;

    let top = position.y;
    let left = position.x + position.width / 2 - tooltipWidth / 2;

    if (left + tooltipWidth > window.innerWidth) {
      left = window.innerWidth - tooltipWidth - 10;
    }

    if (left < 0) {
      left = 10;
    }

    if (top + tooltipHeight > window.innerHeight + window.scrollY) {
      top = position.y - tooltipHeight - 20;
    }

    setAdjustedPosition({ top, left });
  };

  useEffect(() => {
    setVisible(true);
    calculatePosition();

    window.addEventListener("resize", calculatePosition);
    return () => window.removeEventListener("resize", calculatePosition);
  }, [position]);

  return (
    <Fade in={visible}>
      <Paper
        ref={tooltipRef}
        elevation={3}
        sx={{
          position: "absolute",
          top: adjustedPosition.top,
          left: adjustedPosition.left,
          zIndex: 9999,
          minWidth: 200,
          maxWidth: 300,
          p: 2,
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
          transition: "opacity 0.3s, transform 0.3s",
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
            Translation will appear here
          </Typography>
        </Box>
      </Paper>
    </Fade>
  );
};
