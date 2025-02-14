import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface ReelProps {
  src: string;
}

const Reel: React.FC<ReelProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView({ threshold: 0.7 });

  useEffect(() => {
    if (videoRef.current) {
      if (inView) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [inView]);

  return (
    <div ref={ref} className="relative w-full h-screen flex justify-center items-center">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        loop
        muted
        playsInline
      />
      {/* UI Overlay */}
      <div className="absolute bottom-4 left-4 text-white">
        <p className="text-lg font-bold">Username</p>
        <p className="text-sm">#Hashtags #React #Reels</p>
      </div>
      {/* Like, Comment, Share Icons */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-4">
        <button className="bg-gray-800 bg-opacity-50 p-2 rounded-full">❤️</button>
        <button className="bg-gray-800 bg-opacity-50 p-2 rounded-full">💬</button>
        <button className="bg-gray-800 bg-opacity-50 p-2 rounded-full">🔗</button>
      </div>
    </div>
  );
};

export default Reel;
