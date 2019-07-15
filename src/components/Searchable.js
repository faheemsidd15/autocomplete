import React from "react"
import Bold from "../components/Bold"

class Searchable extends React.Component {
	handleClick = (url, name) => {
		this.props.setInputValue(name)
		window.location = url
	}

	render() {
		const { data, cursor, input } = this.props
		return (
			<ul id="nicheData" className="data-list" ref={this.listRef} onChange={this.handleChange}>
				{data.map((data, index) => (
					<li
						key={data.id + data.name + index}
						className={cursor === index ? "active" : null}
						onClick={() => this.handleClick(data.url, data.name)}
					>
						<Bold name={data.name} input={input} />
						<p className="location">{data.location}</p>
					</li>
				))}
			</ul>
		)
	}
}
export default Searchable
