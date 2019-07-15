import React from "react"
import Searchable from "../components/Searchable"
import fetchJsonp from "fetch-jsonp"

class Input extends React.Component {
	constructor() {
		super()
		this.state = {
			data: [],
			input: "",
			cursor: 0
		}
		this.inputRef = React.createRef()
	}

	handleSearch = e => {
		this.setState({ input: e.target.value })
		const url = `http://niche-recruiting-autocomplete.appspot.com/search/?query=${e.target.value}`
		fetchJsonp(url)
			.then(function(response) {
				return response.json()
			})
			.then(res => this.setState({ data: res.results }))
	}

	setInputValue = value => {
		this.setState({ input: value })
	}
	handleKeyDown = e => {
		const { cursor, data } = this.state

		if (e.keyCode === 38 && cursor > 0) {
			this.setState(prevState => ({ cursor: prevState.cursor - 1 }))
		} else if (e.keyCode === 40 && cursor < data.length - 1) {
			this.setState(prevState => ({ cursor: prevState.cursor + 1 }))
		} else if (e.keyCode === 13) {
			data.filter((item, index) => {
				if (index === cursor) {
					this.setInputValue(item.name)
					return window.location = item.url
				}
			})
		}
	}
	componentDidMount() {
		this.inputRef.current.focus()
	}

	render() {
		return (
			<div className="input-wrapper">
				<input
					ref={this.inputRef}
					onChange={this.handleSearch}
					onKeyDown={this.handleKeyDown}
					type="text"
					className="input"
					list="nicheData"
					value={this.state.input}
					placeholder="Find a college or university"
				/>
				{this.state.input.length !== 0 ? (
					<Searchable
						data={this.state.data}
						input={this.state.input}
						setInputValue={this.setInputValue}
						cursor={this.state.cursor}
						handleKeyDown={this.handleKeyDown}
					/>
				) : (
					<div className="holder" />
				)}
			</div>
		)
	}
}

export default Input
