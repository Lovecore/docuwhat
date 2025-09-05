"use client";

import { useRef } from "react";

interface VideoPlayerProps {
  src: string;
  title?: string;
  poster?: string;
}

export function VideoPlayer({ src, title, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="my-8">
      {title && (
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
      )}
      <div className="relative rounded-lg overflow-hidden bg-muted">
        <video
          ref={videoRef}
          className="w-full"
          controls
          poster={poster}
          preload="metadata"
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}