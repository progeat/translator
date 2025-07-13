import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { GB, RU, FR } from "country-flag-icons/react/3x2";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  type SelectChangeEvent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import type { JSX } from "@emotion/react/jsx-runtime";

type LanguageCode = "en" | "ru" | "fr";

interface Language {
  code: LanguageCode;
  label: string;
  icon: JSX.Element;
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

export const TranslationLanguageSelector = () => {
  const { i18n } = useTranslation();
  const [languagePair, setLanguagePair] = useState({
    source: "en" as LanguageCode,
    target: "ru" as LanguageCode,
  });

  useEffect(() => {
    i18n.changeLanguage(languagePair.source);
  }, [languagePair.source, i18n]);

  const handleSourceChange = (e: SelectChangeEvent<LanguageCode>) => {
    const newSource = e.target.value as LanguageCode;
    setLanguagePair((prev) => ({
      source: newSource,
      target:
        newSource === prev.target
          ? LANGUAGES.find((l) => l.code !== newSource)?.code || "ru"
          : prev.target,
    }));
  };

  const handleTargetChange = (e: SelectChangeEvent<LanguageCode>) => {
    setLanguagePair((prev) => ({
      ...prev,
      target: e.target.value as LanguageCode,
    }));
  };

  const swapLanguages = () => {
    setLanguagePair({
      source: languagePair.target,
      target: languagePair.source,
    });
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{ p: 1 }}>
      <FormControl size="small" variant="outlined">
        <Typography variant="caption" sx={{ mb: 0.5, textAlign: "center" }}>
          From
        </Typography>
        <Select
          value={languagePair.source}
          onChange={handleSourceChange}
          renderValue={() => (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {LANGUAGES.find((l) => l.code === languagePair.source)?.icon}
              <span>{languagePair.source.toUpperCase()}</span>
            </Box>
          )}
        >
          {LANGUAGES.map((lang) => (
            <MenuItem
              key={`src-${lang.code}`}
              value={lang.code}
              disabled={lang.code === languagePair.target}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {lang.icon}
                {lang.label}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <IconButton
        onClick={swapLanguages}
        size="small"
        sx={{ alignSelf: "flex-end", mb: 0.5 }}
      >
        <SwapHorizIcon />
      </IconButton>

      <FormControl size="small" variant="outlined">
        <Typography variant="caption" sx={{ mb: 0.5, textAlign: "center" }}>
          To
        </Typography>
        <Select
          value={languagePair.target}
          onChange={handleTargetChange}
          renderValue={() => (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {LANGUAGES.find((l) => l.code === languagePair.target)?.icon}
              <span>{languagePair.target.toUpperCase()}</span>
            </Box>
          )}
        >
          {LANGUAGES.map((lang) => (
            <MenuItem
              key={`tgt-${lang.code}`}
              value={lang.code}
              disabled={lang.code === languagePair.source}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {lang.icon}
                {lang.label}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};
