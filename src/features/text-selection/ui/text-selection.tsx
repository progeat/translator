import { translate } from '@/shared/lib/translation';
import { Box } from '@mui/material';
import { useEffect, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from '../../tooltip/Tooltip';
import { getPosition, getTextSelected } from '../model/selectors';
import { textSelectorActions } from '../model/slice/text-selector-slice';

export const TextSelection: FC = () => {
	const { i18n } = useTranslation();

	const dispatch = useDispatch();
	const selection = useSelector(getTextSelected);
	const position = useSelector(getPosition);

	const onSelectStart = () => {
		dispatch(textSelectorActions.setTextSelected(null));
		dispatch(textSelectorActions.setPosition(null));
	};

	const onMouseUp = async () => {
		const activeSelection = document.getSelection();
		if (!activeSelection) return;

		const text = activeSelection.toString().trim();
		if (!text) {
			dispatch(textSelectorActions.setTextSelected(null));
			dispatch(textSelectorActions.setPosition(null));
			return;
		}

		try {
			const { translations } = await translate({
				sourceLanguageCode: i18n.language,
				targetLanguageCode: 'en',
				texts: [text],
			});
			const translatedText = translations.map(item => item.text).join();
			dispatch(textSelectorActions.setTranslatedText(translatedText));
		} catch (error) {
			dispatch(textSelectorActions.setTranslatedText(null));
			console.error(error);
		}

		const range = activeSelection.getRangeAt(0);
		const rect = range.getBoundingClientRect();

		dispatch(textSelectorActions.setTextSelected(text));
		dispatch(
			textSelectorActions.setPosition({
				x: rect.left,
				y: rect.top + window.scrollY,
				width: rect.width,
				height: rect.height,
			})
		);
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
		dispatch(textSelectorActions.setTextSelected(null));
		dispatch(textSelectorActions.setPosition(null));
	};

  return (
    <Box>{selection && position && <Tooltip onClose={handleClose} />}</Box>
  );
};
