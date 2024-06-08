import { Box } from '@mui/material';
import { useBreakPoint, useUploadImages } from '../hooks';
import { AddPhotoAlternateOutlined } from '@mui/icons-material';
import { useRef } from 'react';

export const AddImageBox = () => {
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
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleFileDrop}
				onClick={handleUploadClick}
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					gap: '20px',
					width:
						breakpoint === 'xs'
							? 'calc(50% - 10px)'
							: breakpoint === 'sm'
								? 'calc(25% - 10px)'
								: 'calc(25% - 10px)',
					height: 'calc(100% - 10px)',
					padding: '10px',
					margin: '0 0 10px 10px',
					borderRadius: '5px',
					overflow: 'hidden',
					cursor: 'pointer',
					backgroundColor: isDragging ? '#ddd' : 'transparent',
					'&:hover': {
						backgroundColor: '#ddd',
					},
				}}
			>
				<AddPhotoAlternateOutlined />
				<div style={{ textAlign: 'center' }}>
					{isDragging
						? '商品画像をここにドロップ'
						: 'クリックまたはドラッグで商品画像を追加アップロード'}
				</div>
			</Box>

			<input
				type="file"
				accept="image/png, image/jpg, image/jpeg, image/webp"
				ref={fileInputRef}
				style={{
					display: 'none',
				}}
				onChange={handleFileSelect}
			/>
		</>
	);
};
