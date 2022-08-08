import { TextField, Button, Container, Typography } from "@mui/material";
import React, { useRef } from "react";

const InputSearchBar = (props) => {
	const searchInputRef = useRef();

	const submitHandler = (event) => {
		event.preventDefault();
		//console.log(searchInputRef.current.value);
		const enteredURL = searchInputRef.current.value;
		if (enteredURL.length === 0) {
			alert("Please enter some URL");
		}
		props.onSubmitClicked(enteredURL);
	};

	// const onChangeHandler = () => {
	//     console.log(nameInputRef);
	// }

	return (
		<Container maxWidth="md" align="center">
			<Typography variant="h2" gutterBottom>
				IMDB Web Scraper.
			</Typography>
			<Typography variant = "body1" gutterBottom paragraph> 
				Built with ReactJS, NodeJS, ExpressJS and mainly {<span style = {{
					color: 'red'
				}}>Love</span>}.
			</Typography>
			<Typography variant = "body1" gutterBottom paragraph> 
				Note that this only works for Movies, cheers!
			</Typography>
			<form onSubmit={submitHandler}>
				<TextField
					hiddenLabel
					id="movie-name"
					placeholder="Enter a movie URL from IMDB"
					variant="filled"
					size="small"
					autoComplete="off"
					inputRef={searchInputRef}
					fullWidth={true}
					// onChange={onChangeHandler}
				/>
				<Button
					variant="contained"
					type="submit"
					style={{
						marginTop: "20px",
					}}
					size="medium">
					Search for Movie
				</Button>
			</form>
		</Container>
	);
};

export default InputSearchBar;
