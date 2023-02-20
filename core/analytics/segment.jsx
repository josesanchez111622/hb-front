import analytics from "./segment-script";

const { default: segmentClient } = analytics;
segmentClient.load(process.env.REACT_APP_SEGMENT_WRITE_KEY);

export { segmentClient };
