import React, { memo } from "react";
import Editor from "@monaco-editor/react";

interface JsonViewerProps {
  data: object;
  height?: string;
  width?: string;
}

const JsonViewer: React.FC<JsonViewerProps> = memo(
  ({ data, height = "400px", width = "100%" }) => {
    const jsonString = JSON.stringify(data, null, 2);

    return (
      <Editor
        // height={height}
        // width={width}
        language="json"
        theme="vs-dark"
        value={jsonString}
        options={{
          readOnly: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          folding: true,
          lineNumbers: "on",
          wordWrap: "on",
          automaticLayout: true,
        }}
      />
    );
  }
);
JsonViewer.displayName = "JsonViewer";
export { JsonViewer };
