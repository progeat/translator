import { useState, type FC } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  IconButton, 
  Tooltip, 
  styled 
} from '@mui/material';
import { TranslationLanguageSelector } from '../../features/translation-language-selector/ui';
import PersonIcon from '@mui/icons-material/Person';
import { TranslationWidget } from '../../features/translation-widget';

const HeaderContainer = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '10px 16px', 
});

const AssistantButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
  border: '1px solid rgba(255, 255, 255, 0.5)',
  borderRadius: '8px',
  padding: '8px 12px',
  gap: '8px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: theme.palette.common.white,
  },
  '& span': {
    fontSize: '0.875rem',
    fontWeight: 500,
  }
}));

export const Header: FC = () => {
  const [widgetOpen, setWidgetOpen] = useState(false);

  return (
    <AppBar position="static">
      <HeaderContainer>
        <Box>
          <TranslationLanguageSelector />
        </Box>

        <Box>
          <Tooltip title="Открыть переводчик">
            <AssistantButton onClick={() => setWidgetOpen(true)}>
              <PersonIcon fontSize="small" />
              <span>Помощник</span>
            </AssistantButton>
          </Tooltip>
        </Box>
      </HeaderContainer>

      {widgetOpen && <TranslationWidget onClose={() => setWidgetOpen(false)} />}
    </AppBar>
  );
};