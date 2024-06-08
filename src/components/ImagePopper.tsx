import { Box, Paper, Popper } from '@mui/material';
import { ImagePopperProps } from '../types/ImagePopperProps';
import { useEffect, useRef } from 'react';

export const ImagePopper = ({
	isOpen,
	setIsOpen,
	anchorEl,
	setAnchorEl,
}: ImagePopperProps) => {
	const popperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handlePopperClose = (e: MouseEvent) => {
			if (
				anchorEl &&
				popperRef.current &&
				!anchorEl.contains(e.target as Node) &&
				!popperRef.current.contains(e.target as Node)
			) {
				setAnchorEl(null);
				setIsOpen(false);
			}
		};

		document.addEventListener('click', handlePopperClose);

		return () => {
			document.removeEventListener('click', handlePopperClose);
		};
	}, [anchorEl]);

	return (
		<Popper
			open={isOpen}
			anchorEl={anchorEl}
			placement="bottom-end"
			ref={popperRef}
		>
			<Paper
				sx={{
					width: '150px',
					maxWidth: '25vw',
					padding: '5px',
					borderRadius: '10px',
					backgroundColor: '#eee',
				}}
			>
				<Box
					sx={{
						width: '100%',
						margin: '0 auto',
						padding: '7px 0 7px 3px',
						borderRadius: '5px',
						cursor: 'pointer',
						color: '#000',
						transition: 'background-color 0.2s',
						'&:hover': {
							backgroundColor: '#ddd',
						},
					}}
				>
					トリミング
				</Box>
				<Box
					sx={{
						width: '100%',
						margin: '0 auto',
						padding: '7px 0 7px 3px',
						borderRadius: '5px',
						cursor: 'pointer',
						color: '#f00',
						transition: 'background-color 0.2s',
						'&:hover': {
							backgroundColor: '#ddd',
						},
					}}
				>
					削除
				</Box>
			</Paper>
		</Popper>
	);
};
