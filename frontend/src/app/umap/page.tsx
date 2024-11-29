"use client";

import UmapPlot from "@/components/UmapPlot";

export default function Page() {
  return (
    <div className="p-4">
    <h1 className="text-xl font-bold mb-4">UMAP Visualization</h1>
    <UmapPlot datasetId={1} target="APRIL" />
</div>
  );
}
