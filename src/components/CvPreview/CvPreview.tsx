"use client";
import { memo } from "react";

export const CVPreview = memo((props: { file?: File }) => {
  const { file } = props;
  if (!file) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">CV Preview</h2>
        <p>No CV uploaded</p>
      </div>
    );
  }
  const url = URL.createObjectURL(file);

  return <iframe src={url} className="w-full h-full" />;
});

CVPreview.displayName = "CVPreview";
