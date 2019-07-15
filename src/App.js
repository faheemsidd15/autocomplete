import React from "react"
import "./App.css"
import Input from "./components/Input"
import logo from "../src/niche-logo.png"

function App() {
	return (
		<div className="container">
			<div className="second-container">
				<div className="image-container">
					<img src={logo} alt="logo" className="logo" />
				</div>
				<Input />
			</div>
		</div>
	)
}

export default App
