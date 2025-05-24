import React from "react";

const HeatMap = () => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center w-full h-full">
      <p>
        This figure clusters authors around common topics. The color brightness
        correlates with which topic the authors' documents correlate with.
        Brighter colors indicate higher probabilities that the document belongs
        to the topic. Darker colors indicate lower probability.
      </p>
      <img
        src="/author_heatmap.jpg"
        alt="Heatmap"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default HeatMap;
