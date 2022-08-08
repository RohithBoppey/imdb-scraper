import {
	Container,
	LinearProgress,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { useState } from "react";
import InputSearchBar from "./components/InputSearchBar";

function App() {
	const [movieToSearch, setMovieToSearch] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isTouched, setIsTouched] = useState(false);

	const handler = (movieURL) => {
		async function sendtoBackend() {
			if (movieURL.length !== 0) {
				const result = await fetch("/getMovie", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						searchURL: movieURL,
					}),
				});
				const finalResult = await result.json();
				console.log(finalResult);
				setMovieToSearch(finalResult);
			}
		}

		setIsTouched(true);
		setIsLoading(true);
		console.log("is loading");
		sendtoBackend().then(() => {
			setIsLoading(false);
			console.log("is loading done");
		});
	};

	return (
		<div>
			<InputSearchBar onSubmitClicked={handler} />
			<Container
				align="center"
				style={{
					marginTop: "100px",
				}}>
				{isLoading && (
					<LinearProgress style={{ backgroundColor: "gold" }} />
				)}
				{!isLoading && isTouched && (
					<TableContainer maxwidth="sm">
						<Table>
							<TableHead>
								<TableRow>
									<TableCell align="center">
										<Typography variant="h5">
											Movie Name
										</Typography>
									</TableCell>
									<TableCell align="center">
										<Typography variant="h5">
											Name of the Director
										</Typography>
									</TableCell>
									<TableCell align="center">
										<Typography variant="h5">
											IMDb Rating
										</Typography>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell align="center">
										<Typography variant="body1">
											{movieToSearch.title}
										</Typography>
									</TableCell>
									<TableCell align="center">
										<Typography variant="body1">
											{movieToSearch.director}
										</Typography>
									</TableCell>
									<TableCell align="center">
										<Typography variant="body1">
											{movieToSearch.rating}
										</Typography>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</Container>
		</div>
	);
}

export default App;
