import { Box } from '@mui/material';
import { useRef } from 'react';
import { useUploadImages } from '../hooks/useUploadImages';
import { AddPhotoAlternateOutlined } from '@mui/icons-material';
import { StagingImage } from './StagingImage';
import { AddImageBox } from './AddImageBox';
import { useBreakPoint } from '../hooks';

export const UploadImages = () => {
	const breakpoint = useBreakPoint();
	const {
		isDragging,
		setIsDragging,
		handleFileSelect,
		handleFileDrop,
		uploadImages,
	} = useUploadImages();
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
					justifyContent: 'start',
					alignItems: 'start',
					flexWrap: 'wrap',
					aspectRatio: ['xs'].includes(breakpoint) ? '2/1' : '4/1',
					overflowY:
						breakpoint === 'xs'
							? uploadImages.length >= 2
								? 'scroll'
								: 'hidden'
							: uploadImages.length >= 4
								? 'scroll'
								: 'hidden',
					overflowX: 'hidden',
					width: '100%',
					padding: '10px 10px 0 0',
					border: 'dashed 2px #000',
				}}
			>
				{uploadImages.length === 0 ? (
					<Box
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleFileDrop}
						onClick={handleUploadClick}
						sx={{
							display: 'flex',
							justifyContent: 'start',
							alignItems: 'start',
							flexWrap: 'wrap',
							gap: '10px',
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
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								flexDirection: 'column',
								width: '100%',
								height: '100%',
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
				) : (
					<>
						{uploadImages.map((image, index) => (
							<StagingImage key={index} index={index} url={image} />
						))}
						{uploadImages.length < 8 && <AddImageBox />}
					</>
				)}
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
