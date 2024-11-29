declare module 'react-plotly.js' {
  import * as React from 'react';

  interface PlotParams {
      data: any[];
      layout: any;
      config?: any;
      onInitialized?: (figure: any, graphDiv: HTMLElement) => void;
      onUpdate?: (figure: any, graphDiv: HTMLElement) => void;
      onPurge?: (graphDiv: HTMLElement) => void;
      onClick?: (event: any) => void;
      onHover?: (event: any) => void;
      onUnhover?: (event: any) => void;
      className?: string;
      style?: React.CSSProperties;
      divId?: string;
      useResizeHandler?: boolean;
      debug?: boolean;
  }

  const Plot: React.FC<PlotParams>;
  export default Plot;
}
