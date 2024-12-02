"use client";


import React, {useState, useEffect} from "react";
import UmapPlot from "@/components/UmapPlot";
import { useRouter } from "next/navigation";

export default function Page() {

  const [datasetId, setDatasetId] = useState<number>(1);
  const [target, setTarget] = useState<string>("APRIL");
  const [metadata, setMetadata] = useState<string>("");
  const [currentParams, setCurrentParams] = useState({
    datasetId: 1,
    target: "APRIL",
    metadata: "",
  });

  const router = useRouter();

  const handleUpdateURLParams = () => {
    setCurrentParams({ datasetId, target, metadata });
    router.push(`/umap?dataset_id=${datasetId}&target=${target}${metadata?`&metadata=${metadata}`:""}`); // Update URL
  };

useEffect(()=>{
  handleUpdateURLParams();
},[datasetId,target,metadata]);

return (
  <div className="p-4">
    <h1 className="text-xl font-bold mb-4">UMAP Visualization</h1>

    <div className="mb-4">
      <label>
        Dataset ID:
        <input
          type="number"
          value={datasetId}
          onChange={(e) => setDatasetId(Number(e.target.value))}
          className="ml-2 p-1 border"
        />
      </label>
      <label className="ml-4">
        Target:
        <input
          type="text"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="ml-2 p-1 border"
        />
      </label>
      <label className="ml-4">
        Metadata (optional):
        <input
          type="text"
          value={metadata}
          onChange={(e) => setMetadata(e.target.value)}
          className="ml-2 p-1 border"
        />
      </label>
    </div>

    <UmapPlot datasetId={datasetId} target={target} metadata={metadata} />
  </div>
);
}
