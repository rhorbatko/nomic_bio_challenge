"use client";

import useSWR from "swr";
import Plot from "react-plotly.js";
import Plotly from "plotly.js";
import { fetchJson } from "@/lib/fetching";

interface UmapPlotProps {
  datasetId: number;
  target: string;
  metadataKey?: string;
  metadataValue?: string;
}

interface UmapPoint {
  x: number;
  y: number;
  color: number;
}

interface RawUmapPoint {
  x_coor: number;
  y_coor: number;
  signal: number;
}

export default function UmapPlot({
  datasetId,
  target,
  metadataKey,
  metadataValue
}: UmapPlotProps) {
  const queryParams = `dataset_id=${datasetId}&target=${target}${
    metadataValue
      ? `&metadata=${encodeURIComponent(`${metadataKey}:${metadataValue}`)}`
      : ""
  }`;
  const { data, error, isLoading } = useSWR<RawUmapPoint[]>(
    `/api/umap?${queryParams}`,
    fetchJson
  );
  if (error) return <div>Error loading data</div>;
  if (isLoading || !data) return <div>Loading...</div>;

  const points: UmapPoint[] = data.map((point: RawUmapPoint) => ({
    x: point.x_coor,
    y: point.y_coor,
    color: point.signal
  }));

  const plotData: Plotly.Data[] = [
    {
      x: points.map((p) => p.x),
      y: points.map((p) => p.y),
      mode: "markers",
      marker: {
        color: points.map((p) => p.color),
        colorscale: "Viridis"
      }
    }
  ];

  return (
    <div className="flex justify-center items-center w-full h-full py-8">
      <div className="w-[75%] h-[500px]">
        <Plot
          data={plotData}
          layout={{
            title: "UMAP Plot",
            width: 800, // Adjust plot width
            height: 500, // Adjust plot height
            autosize: true
          }}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
        />
        ;
      </div>
    </div>
  );
}
