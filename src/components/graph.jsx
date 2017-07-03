import React, {Component} from 'react';
import * as d3 from 'd3';

class Graph extends Component{
	getData(){
		fetch('/search')
		.then(response => response.json())
		.then(data => {
			//console.log(data.data[0].data)
			let stockData = data.data[0].data;
			this.drawGraph(stockData)
		})
	}
	drawGraph(stockData){
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
		var dataArr = stockData.map(d=>({date:parseTime(d[0]),data:d[1]}) )
		//console.log(dataArr)

		let xScale = d3.scaleTime()
			.range([0,innerWidth]);

		let yScale = d3.scaleLinear()
			.range([innerHeight,0]);

		xScale.domain(d3.extent(dataArr,function(d){return d.date}))
		yScale.domain(d3.extent(dataArr,function(d){return d.data}))
		//console.log(yScale.domain(),xScale.domain())
		
		//define 1st line
		let line = d3.line()
			.x(function(d){return xScale(d.date);})
			.y(function(d){return yScale(d.data);})
		
		//add line
		svg.append('path')
			.attr('d',line(dataArr))
			.attr('fill','none')
			.attr('class','line')
			.attr('stroke','blue')

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