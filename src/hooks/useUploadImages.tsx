import { useContext } from 'react';
import { HandleImageDeleteProps, useUploadImagesProps } from '../types';
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
		binaryImages,
		setBinaryImages,
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

	// ステージングされた画像を削除する関数
	const handleImageDelete = ({
		index,
		setIsOpen,
		setAnchorEl,
	}: HandleImageDeleteProps) => {
		const newUploadImages = [...uploadImages];
		newUploadImages.splice(index, 1);

		const newOriginalImages = [...originalImages];
		newOriginalImages.splice(index, 1);

		const newBinaryImages = [...binaryImages];
		newBinaryImages.splice(index, 1);

		const newCrops = [...crops];
		newCrops.splice(index, 1);
		newCrops.push({ x: 0, y: 0 });

		const newZooms = [...zooms];
		newZooms.splice(index, 1);
		newZooms.push(1);

		setUploadImages(newUploadImages);
		setOriginalImages(newOriginalImages);
		setBinaryImages(newBinaryImages);
		setCrops(newCrops);
		setZooms(newZooms);
		setIsOpen(false);
		setAnchorEl(null);
	};

	// 疑似的にバックエンドに画像を送信する関数
	const handleSendImages = () => {
		// formDataとしてBlobデータを格納
		const formData = new FormData();
		binaryImages.forEach((image) => {
			formData.append('trimmingImage', image);
		});

		// 正しく格納できているか確認
		for (const [key, value] of formData.entries()) {
			console.log(`${key}: ${value}`);
		}
	};

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
		handleImageDelete,
		handleSendImages,
	};
};
