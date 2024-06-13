export interface ProviderProps {
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
	binaryImages: Blob[];
	setBinaryImages: (
		originalImages: Blob[] | ((prev: Blob[]) => Blob[])
	) => void;
	crops: { x: number; y: number }[];
	setCrops: (
		crops:
			| { x: number; y: number }[]
			| ((prev: { x: number; y: number }[]) => { x: number; y: number }[])
	) => void;
	zooms: number[];
	setZooms: (zooms: number[] | ((prev: number[]) => number[])) => void;
}
