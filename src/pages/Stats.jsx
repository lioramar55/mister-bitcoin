import { createChart } from 'lightweight-charts'
import { useEffect, useState, useRef } from 'react'
import { getMarketPrice } from '../services/bitcoin.service'

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
  })

  return <div ref={chartContainerRef} />
}
export const Stats = () => {
  const [chartData, setChartData] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    getData()
    if (data) {
      const mappedData = data.map((t) => ({
        time: new Date(t.x * 1000).toLocaleDateString(
          'en-CA'
        ),
        value: t.y,
      }))
      setChartData(mappedData)
    }
  }, [data])

  const getData = async () => {
    const data = await getMarketPrice()
    setData(data)
  }

  if (chartData)
    return (
      <div>
        <h1>BTC Market Data</h1>
        <ChartComponent data={chartData}></ChartComponent>
      </div>
    )
  else return <div>Loading...</div>
}
