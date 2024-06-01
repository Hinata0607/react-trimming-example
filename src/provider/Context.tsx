import { ReactNode, createContext, useState } from 'react';
import { ProviderProps } from '../types';

export const Context = createContext<ProviderProps | null>(null);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
	const [isDragging, setIsDragging] = useState<boolean>(false); // ステージングエリアに画像をドラッグしているか
	const [uploadImages, setUploadImages] = useState<string[]>([]); // トリミング画像のプレビュー用配列
	const [originalImages, setOriginalImages] = useState<string[]>([]); // トリミング前のオリジナル画像配列
	const [crops, setCrops] = useState<{ x: number; y: number }[]>([]); // 画像のトリミング位置の配列
	const [zooms, setZooms] = useState<number[]>([]); // 画像の拡大率の配列

	const contextValue = {
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
	};

	return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
