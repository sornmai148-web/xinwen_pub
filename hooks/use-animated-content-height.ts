import { useEffect, useRef, useState } from "react";
import { Height } from "react-animate-height";

interface ConfigOption {
  defaultHeight: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependency?: any;
}

export const useAnimatedContentHeight = (option: ConfigOption) => {
  const { defaultHeight = 0, dependency } = option || {};
  const [height, setHeight] = useState<Height>(defaultHeight);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      //-- This code used to measure the natural height of the content
      const measureHeight = contentRef.current.scrollHeight;
      setHeight(measureHeight > defaultHeight ? defaultHeight : measureHeight);

      setContentHeight(measureHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependency]);

  function revealHiddenContent() {
    setHeight(height == defaultHeight ? "auto" : defaultHeight);
  }

  return {
    height,
    defaultHeight,
    contentRef,
    revealExceedMax: contentHeight > defaultHeight,
    revealHiddenContent,
  };
};
