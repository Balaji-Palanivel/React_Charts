import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';
import moment from 'moment';
import { LineChart, Line, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { chart_data: [] };


  }

  componentWillMount() {
    $.ajax({
      url: "https://api.coincap.io/v2/assets/bitcoin/history?interval=d1",
      contentType: "application/json"
    })
      .done(
        function (abcd) {
          let temp = [];
          for (let i = 0; i < 10; i++) { temp.push(abcd.data[i]); }
          this.setState({ chart_data: temp });
        }.bind(this)
      )
      .fail(
        function (datas) {
        }.bind(this)
      );
  }
  dateFormatter = (item) => { return moment(item).format("DD MMM YY") }

  render() {
    return (
      <div>


        <div className='b'>
          <LineChart
            width={1000}
            height={300}
            data={this.state.chart_data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <XAxis dataKey="date" tickFormatter={this.dateFormatter} />
            <YAxis />
            <Tooltip labelFormatter={this.dateFormatter} formatter={(value, name) => (name === "priceUsd") ? parseInt(value) : value.toLocaleString()} />
            <Legend />
            <Line dataKey="priceUsd" fill="#8884d8" />
          </LineChart>
        </div>



        <div className='a'>

          <BarChart
            width={1000}
            height={300}
            data={this.state.chart_data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={this.dateFormatter} />
            <YAxis />
            <Tooltip labelFormatter={this.dateFormatter} formatter={(value, name) => (name === "priceUsd") ? parseInt(value) : value.toLocaleString()} />
            <Legend />
            <Bar dataKey="priceUsd" fill="#8884d8" />
          </BarChart>

        </div>

      </div>
    );
  }
}

