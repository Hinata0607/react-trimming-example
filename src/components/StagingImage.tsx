import { Avatar, Box, IconButton } from '@mui/material';
import { useBreakPoint } from '../hooks';
import { useState } from 'react';
import { ImagePopper } from './ImagePopper';
import { MoreVert } from '@mui/icons-material';
import { StagingImageProps } from '../types';

export const StagingImage = ({ url }: StagingImageProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				anchorEl={anchorEl}
				setAnchorEl={setAnchorEl}
			/>
		</Box>
	);
};
