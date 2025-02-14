import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Play } from "lucide-react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

interface ReelProps {
  src: string;
}

const Reel: React.FC<ReelProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView({ threshold: 0.7 });
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLike, setIsLike] = useState(false);

  // Auto-play when in view
  useEffect(() => {
    if (videoRef.current) {
      if (inView) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [inView]);

  // Handle Play/Pause toggle
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center w-full h-screen pt-12"
      onClick={togglePlayPause} // Toggle play/pause when clicking the video
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={src}
        className="object-cover w-full h-full"
        loop
        muted
        playsInline
      />

      {/* Play/Pause Button */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="p-3 bg-black bg-opacity-50 rounded-full">
            <Play size={50} className="text-white" />
          </button>
        </div>
      )}

      {/* UI Overlay */}
      <div className="absolute text-white bottom-4 left-4">
        <p className="text-lg font-bold">Username</p>
        <p className="text-sm">#Hashtags #React #Reels</p>
      </div>

      {/* Like, Comment, Share Icons */}
      <div className="absolute flex flex-col space-y-4 bottom-4 right-4">
        <button
          className="flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation(); // Prevent event from pausing the video
            setIsLike(!isLike);
          }}
        >
          {isLike ? (
            <IoMdHeart size={25} fill="red" />
          ) : (
            <IoMdHeartEmpty size={25} color="white" />
          )}
        </button>

        <button
          className="p-2 bg-gray-800 bg-opacity-50 rounded-full"
          onClick={(e) => e.stopPropagation()} // Prevent play/pause
        >
          💬
        </button>

        <button
          className="p-2 bg-gray-800 bg-opacity-50 rounded-full"
          onClick={(e) => e.stopPropagation()} // Prevent play/pause
        >
          🔗
        </button>
      </div>
    </div>
  );
};

export default Reel;
