import React, {Component} from 'react';
import * as d3 from 'd3';

class Graph extends Component{
	getData(){
		fetch('/search')
		.then(response => response.json())
		.then(stocks => {
			this.drawGraph(stocks)
		})
	}
	drawGraph(stocks){
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
		let xScale = d3.scaleTime()
			.range([0,innerWidth]);

		let yScale = d3.scaleLinear()
			.range([innerHeight,0]);

		//reformat data
		let data = this.changeFormat(stocks.data,parseTime)
		let combinedArr = this.getDomain(data)

		//set domain
		xScale.domain(d3.extent(combinedArr,function(d){return d.date}))
		yScale.domain(d3.extent(combinedArr,function(d){return d.data}))
		
		//define line
		let line = d3.line()
			.x(function(d){return xScale(d.date);})
			.y(function(d){return yScale(d.data);})

		//add lines
		for(let i = 0; i < data.length;i++){
			svg.append('path')
				.attr('d',line(data[i]))
				.attr('fill','none')
				.attr('class','line')
				.attr('stroke', stocks.data[i].color) 
		}
	}
	changeFormat(stocks,parseTime){
		let dataArr = [];
		for(let i = 0; i < stocks.length; i++){
			dataArr[i] = stocks[i].data.map(d=>({date:parseTime(d[0]),data:d[1]}) )
		}
		//console.log(dataArr)
		return dataArr;
	}
	getDomain(dataArr){
		let data =[]
		for(let i = 0; i < dataArr.length;i++){
			data.push(...dataArr[i])
		}
		//console.log(data)
		return data;
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