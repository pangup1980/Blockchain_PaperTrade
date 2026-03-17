import { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';

interface AdvancedChartProps {
  data: any[];
  symbol: string;
  height?: number;
}

export default function AdvancedChart({ data, symbol, height = 400 }: AdvancedChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || data.length === 0) return;

    // Create chart
    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#ffffff' },
        textColor: '#333333',
      },
      width: containerRef.current.clientWidth,
      height: height,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // Add candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    // Format and add data
    const chartData = data.map((item: any) => ({
      time: item.time,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }));

    candlestickSeries.setData(chartData);

    // Add volume series
    const volumeSeries = chart.addHistogramSeries({
      color: '#26a69a',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: 'volume',
    });

    const volumeData = data.map((item: any) => ({
      time: item.time,
      value: parseInt(item.volume) / 1000000, // Convert to millions
      color: item.close >= item.open ? '#26a69a' : '#ef5350',
    }));

    volumeSeries.setData(volumeData);

    // Configure volume scale
    chart.priceScale('volume').applyOptions({
      scaleMargins: {
        top: 0.7,
        bottom: 0,
      },
    });

    // Fit content
    chart.timeScale().fitContent();

    // Handle resize
    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({
          width: containerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, height]);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-lg border border-gray-200"
      style={{ height: `${height}px` }}
    />
  );
}