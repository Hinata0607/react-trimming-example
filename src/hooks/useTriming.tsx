import { useContext } from 'react';
import { Context } from '../provider/Context';
import {
	HandleCropChangeProps,
	HandleCropCompleteProps,
	HandleDrawImageProps,
	HandleGetCropSizeProps,
	HandleMediaLoadedProps,
	handleSetImageProps,
	HandleTrimmingCompleteProps,
	HandleZoomChangeProps,
	UseTrimmingProps,
} from '../types';
import { Size } from 'react-easy-crop';

export const useTriming = (): UseTrimmingProps => {
	const context = useContext(Context);
	if (!context) {
		throw new Error('Context is not provided');
	}

	const {
		uploadImages,
		setUploadImages,
		originalImages,
		setCrops,
		crops,
		zooms,
		setZooms,
	} = context;

	const handleSetImage = ({ index }: handleSetImageProps): void => {
		// 元画像を取得
		const image = new Image();
		image.src = originalImages[index];

		// 擬似的なキャンバスをとコンテクストの生成
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			console.error('2Dコンテキストの取得に失敗しました');
			return;
		}

		// 画像が読み込まれると処理スタート
		image.onload = () => {
			// キャンバスのサイズを指定
			const canvasSize = Math.min(image.width, image.height);
			canvas.width = canvasSize;
			canvas.height = canvasSize;

			// 描画範囲を計算
			const startX = (image.width - canvasSize) / 2;
			const startY = (image.height - canvasSize) / 2;

			// 元画像の中央を切り抜いて描画
			ctx.drawImage(
				// 元画像
				image,
				// 切り抜く範囲
				startX,
				startY,
				canvasSize,
				canvasSize,
				// 描画先のキャンバスの中央に描画するための調整
				0,
				0,
				canvasSize,
				canvasSize
			);
		};
	};

	// クロッピング位置を確定させる関数(移動量の確定時に発火)
	const handleCropComplete = ({
		index,
		croppedAreaPixels,
		canvasRef,
	}: HandleCropCompleteProps): void => {
		const image = new Image();
		image.src = originalImages[index];

		image.onload = () => {
			handleDrawImage({ image, croppedAreaPixels, canvasRef });
		};
	};

	// canvasタグにプレビュー結果を描画する関数(描画対象のcanvasタグをrefで受け取る)
	const handleDrawImage = ({
		image,
		croppedAreaPixels,
		canvasRef,
	}: HandleDrawImageProps) => {
		const canvas = canvasRef.current;
		if (!canvas) {
			console.error('キャンバスの取得に失敗しました');
			return;
		}
		canvas.width = croppedAreaPixels.width;
		canvas.height = croppedAreaPixels.height;
		const ctx = canvas.getContext('2d'); // canvasタグに画像を生成するためのオブジェクト(ctx)を取得
		if (!ctx) {
			console.error('2Dコンテキストの取得に失敗しました');
			return;
		}
		ctx.drawImage(
			image, // 呼び出し元から渡された画像です
			croppedAreaPixels.x, // 左上始点x
			croppedAreaPixels.y, // 左上始点y
			croppedAreaPixels.width, // 描画する画像の横幅
			croppedAreaPixels.height, // 描画する画像の縦幅
			0, // 描画先x座標
			0, // 描画先y座標
			croppedAreaPixels.width, // 描画する横幅
			croppedAreaPixels.height // 描画する縦幅
		);
	};

	// Cropperが画像を読み込んだ時に発火する関数
	// 画像の比率を取得し、stateに格納。
	const handleMediaLoaded = ({
		mediaSize,
		setImageDimensions,
	}: HandleMediaLoadedProps) => {
		setImageDimensions({ width: mediaSize.width, height: mediaSize.height });
	};

	// 読み込んだ画像のwidth, heightのうち小さいにより合わせて返す関数。
	const handleGetCropSize = ({
		width,
		height,
	}: HandleGetCropSizeProps): Size => {
		// 画像の縦幅横幅の内小さい方をcropSizeに設定することで、画面に対して最大のズーム領域を設定可能
		const minSize = Math.min(width, height);
		return { width: minSize, height: minSize };
	};

	// トリミング書く定時に発火する関数
	const handleTrimmingComplete = ({
		index,
		canvasRef,
	}: HandleTrimmingCompleteProps) => {
		// 新しい配列を作成
		const newUploadImages = [...uploadImages];
		// canvasRef からデータURLを取得
		const canvas = canvasRef.current;
		if (!canvas) {
			console.error('キャンバスの取得に失敗しました');
			return;
		}
		const dataUrl = canvas.toDataURL();
		// 配列要素を更新
		newUploadImages[index] = dataUrl;
		// 更新した配列を設定
		setUploadImages(newUploadImages);
	};

	// トリミング座標(crops)変更時に発火する関数
	const handleCropChange = ({ index, crop }: HandleCropChangeProps) => {
		const newCrops = [...crops];
		newCrops[index] = crop;
		setCrops(newCrops);
	};

	// ズーム(zooms)変更時に発火する関数
	const handleZoomChange = ({ index, zoom }: HandleZoomChangeProps) => {
		const newZooms = [...zooms];
		newZooms[index] = zoom;
		setZooms(newZooms);
	};

	return {
		handleSetImage,
		handleCropComplete,
		handleDrawImage,
		handleMediaLoaded,
		handleGetCropSize,
		handleTrimmingComplete,
		handleCropChange,
		handleZoomChange,
	};
};
