export interface ImagePopperProps {
	index: number;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	anchorEl: HTMLElement | null;
	setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
	setisTrimming: (isTrimming: boolean) => void;
}
