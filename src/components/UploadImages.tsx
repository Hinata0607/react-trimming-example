import { Box } from '@mui/material';
import { useBreakPoint } from '../hooks';

export const UploadImages = () => {
	const breakpoint = useBreakPoint();

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'flex-start',
				alignItems: 'center',
				flexWrap: 'wrap',
				aspectRatio: ['xs'].includes(breakpoint) ? '2/1' : '4/1',
				overflowX: 'hidden',
				width: '100%',
				padding: '10px 10px 0 0',
				border: 'dashed 2px #000',
			}}
		></Box>
	);
};
