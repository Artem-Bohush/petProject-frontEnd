/* App.js */
import React from 'react';
import CanvasJSReact from '../../lib/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Chart extends React.Component {

  render() {
    const options = {
      exportEnabled: true,
      animationEnabled: true,
      data: [{
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{percent}%",
        // showInLegend: "true",
        // legendText: "{label}",
        indexLabelFontSize: 14,
        indexLabel: "{label} - {y}",
        dataPoints: this.props.chartData
      }]
    }
    return (
      <div className="history-card">
        <div className="history-card-header">
          <h4 className="header-title">График расходов за весь период</h4>
        </div>
        <CanvasJSChart options={options}/* onRef={ref => this.chart = ref} */ />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default Chart;