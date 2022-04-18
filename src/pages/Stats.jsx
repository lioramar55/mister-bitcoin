import { createChart } from 'lightweight-charts'
import React, { useEffect, useRef, Component } from 'react'

export const ChartComponent = (props) => {
  const chartContainerRef = useRef()

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
      })
    }

    const { data } = props

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
    })
    chart.timeScale().fitContent()

    const newSeries = chart.addAreaSeries()
    newSeries.setData(data)

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)

      chart.remove()
    }
  }, [props.data])

  return <div ref={chartContainerRef} />
}
export class Stats extends Component {
  state = {
    chartData: null,
  }
  async componentDidMount() {
    let time = null
    const chartData = this.props.data.map((t) => {
      time = new Date(t.x * 1000).toLocaleDateString(
        'en-CA'
      )
      return {
        time,
        value: t.y,
      }
    })
    this.setState({ chartData })
  }
  render() {
    const { chartData } = this.state
    if (chartData)
      return (
        <div>
          <ChartComponent data={chartData}></ChartComponent>
        </div>
      )
    else return <div>Loading...</div>
  }
}
