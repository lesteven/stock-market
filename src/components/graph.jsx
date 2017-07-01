import React, {Component} from 'react';
import * as d3 from 'd3';

class Graph extends Component{
	getData(){
		fetch('/search')
		.then(response => response.json())
		.then(data => {
			console.log(data)
			this.drawGraph()
		})
	}
	drawGraph(){
		//variable holding svg attributes
		const margin ={top:50,bottom:50,left:50,right:50}
		const width = 950;
		const height = 350;
		const innerHeight = height - margin.top - margin.bottom;
		const innerWidth = width - margin.left - margin.right;

		//creates svg
		let svg = d3.select("#graph")
			.append("svg")
			.attr("width",width)
			.attr("height",height)
			.attr("class","graph")

		//parse date for x-axis
		let parseTime = d3.timeParse("%Y-%m-%d");

		//set ranges
		let x = d3.scaleTime().range([0,innerWidth]);
		let y = d3.scaleLinear().range([innerHeight,0]);
		console.log(x,y)
	}
	componentDidMount(){
		this.getData()
	}
	render(){
		return(
			<div id='graph'>
			</div>
		)
	}
}

export default Graph;