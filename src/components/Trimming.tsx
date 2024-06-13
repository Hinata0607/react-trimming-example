import { Box, Button, IconButton, Modal, Tooltip } from '@mui/material';
import { TrimmingProps } from '../types/TrimmingProps';
import { Close } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import { useTriming, useUploadImages } from '../hooks';
import { blue } from '@mui/material/colors';

export const Trimming = ({
	index,
	isTrimming,
	setIsTrimming,
}: TrimmingProps) => {
	const [imageDimensions, setImageDimensions] = useState<{
		width: number;
		height: number;
	}>({ width: 0, height: 0 });
	const { originalImages, crops, zooms } = useUploadImages();
	const {
		handleSetImage,
		handleCropComplete,
		handleMediaLoaded,
		handleGetCropSize,
		handleTrimmingComplete,
		handleCropChange,
		handleZoomChange,
	} = useTriming();
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const ASPECT_RATIO = 1 / 1;

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && isTrimming) {
				// Escキー押下でトリミングウィンドウを閉じる
				setIsTrimming(false);
			} else if (event.key === 'Enter' && isTrimming) {
				// Enterキー押下でトリミング確定
				handleTrimmingComplete({ index, canvasRef });
				setIsTrimming(false);
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [index, canvasRef, handleTrimmingComplete]);

	useEffect(() => {
		handleSetImage({ index });
	}, []);

	return (
		<Modal open={isTrimming} onClose={() => setIsTrimming(false)}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					overflow: 'hidden',
					backgroundColor: '#000',
				}}
			>
				<Tooltip title="キャンセル (Esc)" placement="bottom">
					<IconButton
						onClick={() => setIsTrimming(false)}
						sx={{
							zIndex: 100,
							position: 'absolute',
							top: '4%',
							right: '2%',
							width: 'fit-content',
							height: 'fit-content',
							color: '#fff',
							backgroundColor: 'rgba(0, 0, 0, 0.5)',
							borderRadius: '50%',
						}}
					>
						<Close />
					</IconButton>
				</Tooltip>

				<Cropper
					image={originalImages[index]}
					crop={crops[index]}
					zoom={zooms[index]}
					minZoom={1}
					maxZoom={4}
					aspect={ASPECT_RATIO}
					onCropChange={(crop) => handleCropChange({ index, crop })}
					onCropComplete={(_, croppedAreaPixels) =>
						handleCropComplete({ index, croppedAreaPixels, canvasRef })
					}
					onZoomChange={(zoom) => handleZoomChange({ index, zoom })}
					onMediaLoaded={(mediaSize) =>
						handleMediaLoaded({ mediaSize, setImageDimensions })
					}
					cropSize={handleGetCropSize(imageDimensions)}
					classes={{
						containerClassName: 'container',
						cropAreaClassName: 'crop-area',
						mediaClassName: 'media',
					}}
					showGrid
				/>

				<canvas
					ref={canvasRef}
					style={{
						position: 'absolute',
						bottom: '2%',
						left: '5%',
						width: '150px',
						aspectRatio: '1/1',
						maxWidth: '20vw',
					}}
				/>

				<Box
					sx={{
						position: 'absolute',
						bottom: '2%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: '30px',
						padding: '10px',
						borderRadius: '5px',
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
					}}
				>
					<Button
						variant="contained"
						size="large"
						onClick={() => {
							handleTrimmingComplete({ index, canvasRef });
							setIsTrimming(false);
						}}
						sx={{
							backgroundColor: blue[500],
						}}
					>
						トリミング (Enter)
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};
