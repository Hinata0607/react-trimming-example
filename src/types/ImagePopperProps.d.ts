export interface ImagePopperProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	anchorEl: HTMLElement | null;
	setAnchorEl: (anchorEl: HTMLElement | null) => void;
}
