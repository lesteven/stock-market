import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getStocks,fetchDB} from '../redux/modules/stocksModule';
import * as d3 from 'd3';
var ws = require('../wsClient');


class Graph extends Component{
	constructor(props){
		super(props);
	}
	drawGraph(stocks){
		//variable holding svg attributes
		const margin ={top:50,bottom:50,left:50,right:50}
		const width = 950;
		const height = 350;
		const innerHeight = height - margin.top - margin.bottom;
		const innerWidth = width - margin.left - margin.right;

		d3.selectAll("svg > *").remove();

		//creates svg
		let svg = d3.select('svg')
			//.append('svg')
			.attr('width',width)
			.attr('height',height)
			.attr('class','graph')
			.append('g').attr('transform','translate('
				+ margin.left + ',' + margin.top + ')');

		//parse date for x-axis
		let parseTime = d3.timeParse('%Y-%m-%d');

		//set ranges
		let xScale = d3.scaleTime()
			.range([0,innerWidth]);

		let yScale = d3.scaleLinear()
			.range([innerHeight,0]);

		//reformat data
		let data = this.changeFormat(stocks,parseTime)
		let combinedArr = this.combineArrays(data)

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
				.attr('stroke', stocks[i].color) 
				.attr('stroke-width','2px')
		}

		//add x and y axis
		svg.append('g')
			.attr('class','x-axis')
			.attr('transform','translate(0,'+ innerHeight +')')
			.call(d3.axisBottom(xScale));

		svg.append('g')
			.attr('class','x-axis')
			.call(d3.axisLeft(yScale));

	}
	changeFormat(stocks,parseTime){
		let dataArr = [];
		for(let i = 0; i < stocks.length; i++){
			dataArr[i] = stocks[i].data.map(d=>({date:parseTime(d[0]),data:d[1]}) )
		}
		//console.log(dataArr)
		return dataArr;
	}
	combineArrays(dataArr){
		let data =[]
		for(let i = 0; i < dataArr.length;i++){
			data.push(...dataArr[i])
		}
		//console.log(data)
		return data;
	}
	componentDidMount(){
		this.props.getDB()
		ws.onopen = function(){
			ws.send('Connection established.')
		}
		ws.onmessage = function(msg){
			let stocks = JSON.parse(msg.data)
			console.log(stocks,'graph.jsx')
			this.props.getStocks(stocks)
		}.bind(this)
	}
	componentWillReceiveProps(props){
		this.drawGraph(props.data)
	}
	render(){
		return(
			<div id='graph'>
			<svg></svg>
			</div>
		)
	}
}

const mapStateToProps =(state)=>{
	return{
		data:state.data
	}
}
const mapDispatchToProps =(dispatch)=>{
	return{
		getStocks:(stocks)=>dispatch(getStocks(stocks)),
		getDB:()=>dispatch(fetchDB())
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Graph);