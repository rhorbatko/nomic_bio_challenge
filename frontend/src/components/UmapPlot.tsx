'use client';

import useSWR from 'swr';
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js'
import { fetchJson } from '@/lib/fetching';

interface UmapPlotProps {
    datasetId: number;
    target: string;
    metadata?: string;
}

interface UmapPoint {
  x: number;
  y: number;
  color: number;
}


export default function UmapPlot({ datasetId, target, metadata }: UmapPlotProps) {

    const queryParams = `dataset_id=${datasetId}&target=${target}${
        metadata ? `&metadata=${encodeURIComponent(metadata)}` : ""
      }`;
    const { data, error, isLoading } = useSWR<UmapPoint[]>(
        `/api/umap?${queryParams}`,
        fetchJson
    );

    if (error) return <div>Error loading data</div>;
    if (isLoading||!data) return <div>Loading...</div>;

    const points: UmapPoint[] = data.map((point: any) => ({
        x: point.x_coor,
        y: point.y_coor,
        color: point.signal,
    }));

    const plotData: Plotly.Data[] = [
      {
          x: points.map((p) => p.x),
          y: points.map((p) => p.y),
          mode: 'markers',
          marker: {
              color: points.map((p) => p.color),
              colorscale: 'Viridis',
          },
      },
  ];

    return (
        <Plot
            data={plotData}
            layout={{ title: 'UMAP Plot' }}
        />
    );
}
