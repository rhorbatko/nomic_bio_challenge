"use client";

import dynamic from "next/dynamic";
import React, { useCallback, useState, useEffect } from "react";
const UmapPlot = dynamic(() => import("@/components/UmapPlot"), { ssr: false });
import { useRouter } from "next/navigation";
import { useTargets } from "@/lib/target";
import { useDatasets } from "@/lib/dataset";
import { useMetadataOptions } from "@/lib/metadata";

export default function Page() {
  const [datasetId, setDatasetId] = useState<number>(1);
  const [target, setTarget] = useState<string>("APRIL");
  const [metadataKey, setMetadataKey] = useState<string>("");
  const [metadataValue, setMetadataValue] = useState<string>("");
  const { targets } = useTargets();
  const { datasets } = useDatasets();
  const { metadataKeys, metadataValues } = useMetadataOptions();

  const router = useRouter();

  const handleUpdateURLParams = useCallback(() => {
    router.push(
      `/umap?dataset_id=${datasetId}&target=${target}${metadataValue ? `&metadata=${metadataKey}:${metadataValue}` : ""}`
    ); // Update URL
  }, [router, datasetId, target, metadataKey, metadataValue]);

  useEffect(() => {
    handleUpdateURLParams();
  }, [handleUpdateURLParams]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">UMAP Visualization</h1>

      <div className="mb-4">
        <label className="ml-4">
          Dataset ID:
          <select
            value={datasetId}
            onChange={(e) => setDatasetId(Number(e.target.value))}
            className="ml-2 p-1 border"
          >
            {datasets?.map((t) => <option key={t.id}>{t.id}</option>)}
          </select>
        </label>

        <label className="ml-4">
          Target:
          <select
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="ml-2 p-1 border"
          >
            {targets?.map((t) => <option key={t.id}>{t.name}</option>)}
          </select>
        </label>

        <label className="ml-4">
          Metadata Key:
          <select
            value={metadataKey}
            onChange={(e) => setMetadataKey(e.target.value)}
            className="ml-2 p-1 border"
          >
            <option value="">Select Key</option>
            {metadataKeys.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </label>

        {/* Metadata Value Selection */}
        {metadataKey && (
          <label className="ml-4">
            Metadata Value:
            <select
              value={metadataValue}
              onChange={(e) => setMetadataValue(e.target.value)}
              className="ml-2 p-1 border"
            >
              <option value="">Select Value</option>
              {metadataValues[metadataKey]?.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <UmapPlot
        datasetId={datasetId}
        target={target}
        metadataKey={metadataKey}
        metadataValue={metadataValue}
      />
    </div>
  );
}
