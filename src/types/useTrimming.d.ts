export interface UseTrimmingProps {
	handleSetImage: ({ index }: SetImageProps) => void;
	handleCropComplete: ({
		index,
		croppedAreaPixels,
		canvasRef,
	}: HandleCropCompleteProps) => void;
	handleDrawImage: ({
		index,
		croppedAreaPixels,
		canvasRef,
	}: HandleDrawImageProps) => void;
	handleMediaLoaded: ({
		mediaSize,
		setImageDimensions,
	}: HandleMediaLoadedProps) => void;
	handleGetCropSize: ({ imageDimensions }: HandleGetCropSizeProps) => {
		width: number;
		height: number;
	};
	handleTrimmingComplete: ({
		index,
		canvasRef,
	}: HandleTrimmingCompleteProps) => void;
	handleCropChange: ({ index, crop }: HandleCropChangeProps) => void;
	handleZoomChange: ({ index, zoom }: HandleZoomChangeProps) => void;
}

export interface handleSetImageProps {
	index: number;
}

export interface HandleCropCompleteProps {
	index: number;
	croppedAreaPixels: { x: number; y: number; width: number; height: number };
	canvasRef: React.RefObject<HTMLCanvasElement>;
}

export interface HandleDrawImageProps {
	image: HTMLImageElement;
	croppedAreaPixels: { x: number; y: number; width: number; height: number };
	canvasRef: React.RefObject<HTMLCanvasElement>;
}

export interface HandleMediaLoadedProps {
	mediaSize: { width: number; height: number };
	setImageDimensions: React.Dispatch<
		React.SetStateAction<{ width: number; height: number }>
	>;
}

export interface HandleGetCropSizeProps {
	width: number;
	height: number;
}

export interface HandleTrimmingCompleteProps {
	index: number;
	canvasRef: React.RefObject<HTMLCanvasElement>;
}

export interface HandleCropChangeProps {
	index: number;
	crop: { x: number; y: number };
}

export interface HandleZoomChangeProps {
	index: number;
	zoom: number;
}
