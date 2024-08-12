import React, { memo, useCallback, useMemo } from "react";
import Editor from "@monaco-editor/react";

interface PromptEditorProps {
  data: string;
  height?: string;
  width?: string;
  onChange?: (value: string | undefined) => void;
}

const debounce = (func: any, wait: number) => {
  let timeout: any;
  return function (this: any, ...args: any) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
};

const tryPrettyPrint = (value: string) => {
  try {
    return JSON.stringify(JSON.parse(value), null, 2);
  } catch (e) {
    return value;
  }
};

const PromptEditor: React.FC<PromptEditorProps> = memo(
  ({ data, height = "400px", width = "100%", onChange }) => {
    const jsonString = tryPrettyPrint(data);
    const debouncedOnChange = useMemo(
      () => debounce(onChange, 500),
      [onChange]
    );
    return (
      <Editor
        // height={height}
        // width={width}
        language="json"
        theme="vs-dark"
        value={jsonString}
        options={{
          readOnly: false,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          folding: true,
          lineNumbers: "on",
          wordWrap: "on",
          automaticLayout: true,
        }}
        onChange={debouncedOnChange}
      />
    );
  }
);
PromptEditor.displayName = "PromptEditor";
export { PromptEditor };
