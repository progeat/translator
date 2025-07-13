import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Paper,
  Typography,
  IconButton,
  Box,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useDrag } from "../lib/useDrag";
import { TranslationLanguageSelector } from "../../translation-language-selector/ui";

export interface TranslationWidgetProps {
  onClose: () => void;
}

export const TranslationWidget: React.FC<TranslationWidgetProps> = ({
  onClose,
}) => {
  const widgetRef = React.useRef<HTMLDivElement>(null);
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const { position, setPosition, handleMouseDown } = useDrag();

  useLayoutEffect(() => {
    if (widgetRef.current) {
      const width = widgetRef.current.offsetWidth;
      const height = widgetRef.current.offsetHeight;
      setPosition({
        x: window.innerWidth / 2 - width / 2,
        y: window.innerHeight / 2 - height / 2,
      });
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = () => {
      if (!widgetRef.current) return;

      const rect = widgetRef.current.getBoundingClientRect();
      const threshold = 1;

      const nearBoundary =
        rect.left < threshold ||
        rect.top < threshold ||
        window.innerWidth - rect.right < threshold ||
        window.innerHeight - rect.bottom < threshold;

      if (nearBoundary) {
        onClose();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [onClose]);

  return (
    <Paper
      ref={widgetRef}
      sx={{
        position: "fixed",
        top: position.y,
        left: position.x,
        zIndex: 9999,
        minWidth: 400,
        maxWidth: 600,
        p: 3,
        borderRadius: "12px",
        boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.2)",
        cursor: "grab",
        "&:active": { cursor: "grabbing" },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        onMouseDown={handleMouseDown}
      >
        <Box display="flex" alignItems="center">
          <DragIndicatorIcon sx={{ mr: 1, color: "action.active" }} />
          <Typography variant="h6" fontWeight="bold">
            Переводчик
          </Typography>
        </Box>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box mt={3}>
        <TranslationLanguageSelector />
      </Box>

      <Box mt={3}>
        <TextField
          label="Исходный текст"
          multiline
          rows={3}
          fullWidth
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
          autoFocus
        />
      </Box>

      <Box mt={3}>
        <TextField
          label="Перевод"
          multiline
          rows={3}
          fullWidth
          value={translatedText}
          onChange={(e) => setTranslatedText(e.target.value)}
        />
      </Box>
    </Paper>
  );
};
