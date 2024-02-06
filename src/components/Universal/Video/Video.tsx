import React from 'react';
import ReactPlayer from 'react-player';



const Video: React.FC<{ videoUrl: string }> = (props) => {
    return (
        <div className="container p-0">
            <div className="row">
              <div className="col-12">
                <ReactPlayer
                  url={props.videoUrl}
                  controls
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
    );
};

export default Video;
