export interface useUploadImagesProps {
	isDragging: boolean;
	setIsDragging: (isDragging: boolean) => void;
	uploadImages: string[];
	setUploadImages: (
		uploadImages: string[] | ((prev: string[]) => string[])
	) => void;
	originalImages: string[];
	setOriginalImages: (
		originalImages: string[] | ((prev: string[]) => string[])
	) => void;
	crops: { x: number; y: number }[];
	setCrops: (
		crops:
			| { x: number; y: number }[]
			| ((prev: { x: number; y: number }[]) => { x: number; y: number }[])
	) => void;
	zooms: number[];
	setZooms: (zooms: number[] | ((prev: number[]) => number[])) => void;
	handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleFileDrop: (event: React.DragEvent<HTMLDivElement>) => void;
	handleImageDelete: ({
		index,
		setIsPopperOpen,
		setAnchorEl,
	}: HandleImageDeleteProps) => void;
	handleSendImages: () => void;
}

export interface HandleImageDeleteProps {
	index: number;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}
