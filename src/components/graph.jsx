import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getStocks,fetchDB} from '../redux/modules/stocksModule';
import {gotError,noError} from '../redux/modules/errorModule';
//import * as d3 from 'd3';
import {
	selectAll,
	select,
	selection} from 'd3-selection';
import {timeParse} from 'd3-time-format';
import {scaleTime,scaleLinear} from 'd3-scale';
import {range,extent} from 'd3-array';
import {line} from 'd3-shape';
import {axisBottom,axisLeft} from 'd3-axis';

var ws = require('../wsClient');


class Graph extends Component{
	constructor(props){
		super(props);
		this.state={}
	}
	drawGraph(stocks){
		//variable holding svg attributes
		const margin ={top:50,bottom:50,left:50,right:50}
		const width = 950;
		const height = 350;
		const innerHeight = height - margin.top - margin.bottom;
		const innerWidth = width - margin.left - margin.right;

		selectAll("svg > *").remove();

		//creates svg
		let svg = select('svg')
			//.append('svg')
			.attr('width',width)
			.attr('height',height)
			.attr('class','graph')
			.append('g').attr('transform','translate('
				+ margin.left + ',' + margin.top + ')');

		//parse date for x-axis
		let parseTime = timeParse('%Y-%m-%d');

		//set ranges
		let xScale = scaleTime()
			.range([0,innerWidth]);

		let yScale = scaleLinear()
			.range([innerHeight,0]);

		//reformat data
		let data = this.changeFormat(stocks,parseTime)
		let combinedArr = this.combineArrays(data)

		//set domain
		xScale.domain(extent(combinedArr,function(d){return d.date}))
		yScale.domain(extent(combinedArr,function(d){return d.data}))
		
		//define line
		let lineChart = line()
			.x(function(d){return xScale(d.date);})
			.y(function(d){return yScale(d.data);})

		//add lines
		for(let i = 0; i < data.length;i++){
			svg.append('path')
				.attr('d',lineChart(data[i]))
				.attr('fill','none')
				.attr('class','line')
				.attr('stroke', stocks[i].color) 
				.attr('stroke-width','2px')
		}

		//add x and y axis
		svg.append('g')
			.attr('class','x-axis')
			.attr('transform','translate(0,'+ innerHeight +')')
			.call(axisBottom(xScale));

		svg.append('g')
			.attr('class','x-axis')
			.call(axisLeft(yScale));

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
			if(msg.data === 'Error'){
				this.props.gotError(msg.data)
			}
			else{
				let stocks = JSON.parse(msg.data)
				//console.log(stocks,'graph.jsx')
				this.props.noError('')
				this.props.getStocks(stocks)
			}
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
		getDB:()=>dispatch(fetchDB()),
		gotError:(error)=>dispatch(gotError(error)),
		noError:(error)=>dispatch(noError(error))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Graph);