import { Avatar, Box, IconButton } from '@mui/material';
import { useBreakPoint } from '../hooks';
import { useState } from 'react';
import { ImagePopper } from './ImagePopper';
import { MoreVert } from '@mui/icons-material';
import { StagingImageProps } from '../types';
import { Trimming } from './Trimming';

export const StagingImage = ({ index, url }: StagingImageProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [isTrimming, setIsTrimming] = useState<boolean>(false);
	const breakpoint = useBreakPoint();

	const handleOpen = (e: React.MouseEvent<HTMLElement>): void => {
		setAnchorEl(e.currentTarget);
		setIsOpen(true);
	};

	return (
		<Box
			sx={{
				position: 'relative',
				width: breakpoint === 'xs' ? 'calc(50% - 10px)' : 'calc(25% - 10px)',
				height: 'calc(100% - 10px)',
				borderRadius: '5px',
				overflow: 'hidden',
				margin: '0 0 10px 10px',
			}}
		>
			<Avatar
				src={url}
				variant="square"
				sx={{
					width: '100%',
					height: '100%',
					'&:hover + .vertButton': {
						opacity: 1,
					},
				}}
			/>
			<IconButton
				onClick={handleOpen}
				className="vertButton"
				sx={{
					position: 'absolute',
					top: '5px',
					right: '5px',
					color: '#fff',
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					opacity: 0,
					'&:hover': {
						opacity: 1,
					},
				}}
			>
				<MoreVert />
			</IconButton>
			<ImagePopper
				index={index}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				anchorEl={anchorEl}
				setAnchorEl={setAnchorEl}
				setisTrimming={setIsTrimming}
			/>
			<Trimming
				index={index}
				isTrimming={isTrimming}
				setIsTrimming={setIsTrimming}
			/>
		</Box>
	);
};
