import Reel from "./reel";

import video12 from "../../../../assets/videos/video12.mp4";
import video13 from "../../../../assets/videos/video13.mp4";
import video14 from "../../../../assets/videos/video14.mp4";
import video15 from "../../../../assets/videos/video15.mp4";
import video16 from "../../../../assets/videos/video16.mp4";
import video17 from "../../../../assets/videos/video17.mp4";
import video18 from "../../../../assets/videos/video18.mp4";
import video19 from "../../../../assets/videos/video18.mp4";

const videos = [
    // video1,
    // video2,
    // video3,
    // video4,
    // video5,
    // video6,
    // video7,
    // vide11,
    video12,
    video13,
    video14,
    video15,
    video16,
    video17,
    video18,
    video19,
];

const ReelList = () => {
    return (
        <div className="h-screen w-full overflow-y-auto snap-y snap-mandatory">
            {videos.map((video, index) => (
                <div key={index} className="snap-center">
                    <Reel src={video} />
                </div>
            ))}
        </div>
    );
};

export default ReelList;
