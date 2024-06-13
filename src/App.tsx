import { Box, Button } from '@mui/material';
import { UploadImages } from './components';
import { blue } from '@mui/material/colors';
import { useUploadImages } from './hooks';

function App() {
	const { handleSendImages } = useUploadImages();

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					gap: '100px',
					width: '1000px',
					maxWidth: '100vw',
					padding: '50px 0',
					margin: '0 auto',
				}}
			>
				<UploadImages />
				<Button
					onClick={handleSendImages}
					sx={{ backgroundColor: blue[500] }}
					variant="contained"
				>
					送信
				</Button>
			</Box>
		</>
	);
}

export default App;
