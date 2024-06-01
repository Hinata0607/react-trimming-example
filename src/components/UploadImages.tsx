import { Box } from '@mui/material';
import { useBreakPoint } from '../hooks';
import { useRef } from 'react';
import { useUploadImages } from '../hooks/useUploadImages';
import { AddPhotoAlternateOutlined } from '@mui/icons-material';

export const UploadImages = () => {
	const breakpoint = useBreakPoint();
	const { isDragging, setIsDragging, handleFileSelect, handleFileDrop } =
		useUploadImages();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleUploadClick = () => {
		fileInputRef.current?.click();
	};

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = () => {
		setIsDragging(false);
	};

	return (
		<>
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
			>
				<Box
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleFileDrop}
					onClick={handleUploadClick}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						gap: '5px',
						width: 'calc(100% - 10px)',
						height: 'calc(100% - 10px)',
						margin: '0 0 10px 10px',
						cursor: 'pointer',
						overflow: 'hidden',
						wordBreak: 'break-all',
						color: '#000',
						backgroundColor: isDragging ? '#ddd' : 'transparent',
						transition: 'background-color 0.2s',
						'&:hover': {
							backgroundColor: '#ddd',
						},
					}}
				>
					<AddPhotoAlternateOutlined />
					<div style={{ textAlign: 'center' }}>
						{isDragging
							? '商品画像をここにドロップ'
							: 'クリックまたはドラッグで商品画像をアップロード'}
					</div>
				</Box>
			</Box>
			<input
				type="file"
				accept="image/png,
					image/jpg,
					image/jpeg,
					image/webp"
				ref={fileInputRef}
				style={{
					display: 'none',
				}}
				onChange={handleFileSelect}
			/>
		</>
	);
};
