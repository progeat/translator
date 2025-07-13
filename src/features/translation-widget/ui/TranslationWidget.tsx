import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Paper,
  Typography,
  IconButton,
  Box,
  TextField,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { useDrag } from "../lib/useDrag";
import { GB, RU, FR } from "country-flag-icons/react/3x2";

type LanguageCode = "en" | "ru" | "fr";

interface Language {
  code: LanguageCode;
  label: string;
  icon: React.ReactNode;
  shortLabel: string;
}

const LANGUAGES: Language[] = [
  {
    code: "en",
    label: "English",
    icon: <GB style={{ width: 20, height: 15 }} />,
    shortLabel: "EN",
  },
  {
    code: "ru",
    label: "Russian",
    icon: <RU style={{ width: 20, height: 15 }} />,
    shortLabel: "RU",
  },
  {
    code: "fr",
    label: "French",
    icon: <FR style={{ width: 20, height: 15 }} />,
    shortLabel: "FR",
  },
];

export interface TranslationWidgetProps {
  onClose: () => void;
  onTranslate: (
    text: string,
    from: LanguageCode,
    to: LanguageCode
  ) => Promise<string>;
}

export const TranslationWidget: React.FC<TranslationWidgetProps> = ({
  onClose,
  onTranslate,
}) => {
    const widgetRef = React.useRef<HTMLDivElement>(null);
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [languagePair, setLanguagePair] = useState({
    source: "en" as LanguageCode,
    target: "ru" as LanguageCode,
  });
  const [isTranslating, setIsTranslating] = useState(false);

  const { position, setPosition, handleMouseDown } = useDrag();

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      setTranslatedText("");
      return;
    }

    setIsTranslating(true);
    try {
      const result = await onTranslate(
        sourceText,
        languagePair.source,
        languagePair.target
      );
      setTranslatedText(result);
    } catch (error) {
      console.error("Translation error:", error);
      setTranslatedText("Ошибка перевода");
    } finally {
      setIsTranslating(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(handleTranslate, 500);
    return () => clearTimeout(timer);
  }, [sourceText, languagePair.source, languagePair.target]);

  useLayoutEffect(() => {
    if (widgetRef.current) {
      const width = widgetRef.current.offsetWidth;
      const height = widgetRef.current.offsetHeight;
      setPosition({
        x: window.innerWidth / 2 - width / 2,
        y: window.innerHeight / 2 - height / 2,
      });
    }
  }, [setPosition]);

  const handleSourceChange = (event: SelectChangeEvent<LanguageCode>) => {
    const newSource = event.target.value as LanguageCode;
    setLanguagePair((prev) => ({
      source: newSource,
      target:
        newSource === prev.target
          ? LANGUAGES.find((l) => l.code !== newSource)?.code || "ru"
          : prev.target,
    }));
  };

  const handleTargetChange = (event: SelectChangeEvent<LanguageCode>) => {
    setLanguagePair((prev) => ({
      ...prev,
      target: event.target.value as LanguageCode,
    }));
  };

  const swapLanguages = () => {
    setLanguagePair({
      source: languagePair.target,
      target: languagePair.source,
    });
  };
  

  return (
    <Paper
      ref={widgetRef}
      sx={{
        position: "fixed",
        top: position.y,
        left: position.x,
        zIndex: 10, 
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

      <Box mt={3} display="flex" alignItems="center" gap={2}>
        <FormControl variant="outlined" size="small" fullWidth>
          <Select
            value={languagePair.source}
            onChange={handleSourceChange}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 300,
                  "& .MuiMenuItem-root": {
                    minHeight: 48,
                  },
                },
              },
            }}
          >
            {LANGUAGES.map((lang) => (
              <MenuItem
                key={`src-${lang.code}`}
                value={lang.code}
                disabled={lang.code === languagePair.target}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  {lang.icon}
                  {lang.label}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <IconButton onClick={swapLanguages} size="small">
          <SwapHorizIcon />
        </IconButton>

        <FormControl variant="outlined" size="small" fullWidth>
          <Select
            value={languagePair.target}
            onChange={handleTargetChange}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 300,
                  "& .MuiMenuItem-root": {
                    minHeight: 48,
                  },
                },
              },
            }}
          >
            {LANGUAGES.map((lang) => (
              <MenuItem
                key={`tgt-${lang.code}`}
                value={lang.code}
                disabled={lang.code === languagePair.source}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  {lang.icon}
                  {lang.label}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
          value={isTranslating ? "Перевод..." : translatedText}
          InputProps={{
            readOnly: true,
            endAdornment: isTranslating && <CircularProgress size={24} />,
          }}
        />
      </Box>
    </Paper>
  );
};
