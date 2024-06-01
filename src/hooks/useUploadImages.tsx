import { useContext } from 'react';
import { useUploadImagesProps } from '../types';
import { Context } from '../provider/Context';

export const useUploadImages = (): useUploadImagesProps => {
	const context = useContext(Context);
	if (!context) {
		throw new Error('Context is not provided');
	}

	const {
		isDragging,
		setIsDragging,
		uploadImages,
		setUploadImages,
		originalImages,
		setOriginalImages,
		crops,
		setCrops,
		zooms,
		setZooms,
	} = context;

	// 画像をクリックで選択した場合の関数
	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (uploadImages.length >= 8) return;
		const file = event.target.files?.[0];
		if (file) {
			const fileUrl = URL.createObjectURL(file);
			setUploadImages([...uploadImages, fileUrl]);
			setOriginalImages([...originalImages, fileUrl]);
			event.target.value = '';
		}
	};

	// 画像をドラッグアンドドロップした場合の関数
	const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		if (uploadImages.length >= 8) {
			setIsDragging(false);
			return;
		}
		const file = event.dataTransfer.files[0];
		const allowedFormats = [
			'image/png',
			'image/jpeg',
			'image/jpg',
			'image/webp',
		];
		if (file && allowedFormats.includes(file.type)) {
			const fileUrl = URL.createObjectURL(file);
			setUploadImages([...uploadImages, fileUrl]);
			setOriginalImages([...uploadImages, fileUrl]);
			setIsDragging(false);
		} else {
			console.log('許可されていない形式');
			setIsDragging(false);
		}
	};

	console.log(uploadImages);

	return {
		isDragging,
		setIsDragging,
		uploadImages,
		setUploadImages,
		originalImages,
		setOriginalImages,
		crops,
		setCrops,
		zooms,
		setZooms,
		handleFileSelect,
		handleFileDrop,
	};
};
