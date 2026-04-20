// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import ReactPlayer from "react-player";
// import { FaPlay, FaTimes } from "react-icons/fa";

// const VideoGallery = ({ videos }) => {
//   const [selectedVideo, setSelectedVideo] = useState(null);

//   return (
//     <>
//       <div className="video-gallery">
//         <div className="row g-4">
//           {videos.map((video, index) => (
//             <motion.div
//               key={index}
//               className="col-lg-4 col-md-6"
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <div
//                 className="video-card glass"
//                 style={{
//                   borderRadius: "20px",
//                   overflow: "hidden",
//                   cursor: "pointer",
//                   position: "relative",
//                   transition: "all 0.3s ease",
//                 }}
//                 onClick={() => setSelectedVideo(video)}
//               >
//                 {/* Thumbnail */}
//                 <div
//                   style={{
//                     position: "relative",
//                     paddingBottom: "56.25%", // 16:9 aspect ratio
//                     background: "#1a1a2e",
//                   }}
//                 >
//                   <img
//                     src={video.thumbnail}
//                     alt={video.title}
//                     style={{
//                       position: "absolute",
//                       top: 0,
//                       left: 0,
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                       transition: "transform 0.5s ease",
//                     }}
//                     onMouseEnter={(e) =>
//                       (e.currentTarget.style.transform = "scale(1.05)")
//                     }
//                     onMouseLeave={(e) =>
//                       (e.currentTarget.style.transform = "scale(1)")
//                     }
//                   />

//                   {/* Play Button Overlay */}
//                   <div
//                     style={{
//                       position: "absolute",
//                       top: "50%",
//                       left: "50%",
//                       transform: "translate(-50%, -50%)",
//                       width: "60px",
//                       height: "60px",
//                       background: "rgba(0,0,0,0.7)",
//                       borderRadius: "50%",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       backdropFilter: "blur(4px)",
//                       transition: "all 0.3s ease",
//                     }}
//                   >
//                     <FaPlay
//                       style={{
//                         color: "white",
//                         fontSize: "24px",
//                         marginLeft: "4px",
//                       }}
//                     />
//                   </div>
//                 </div>

//                 {/* Video Info */}
//                 <div style={{ padding: "15px" }}>
//                   <h4
//                     style={{
//                       fontSize: "16px",
//                       marginBottom: "5px",
//                       color: "var(--text-primary)",
//                     }}
//                   >
//                     {video.title}
//                   </h4>
//                   <p
//                     style={{ fontSize: "13px", color: "var(--text-secondary)" }}
//                   >
//                     {video.duration} • {video.views} views
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Video Modal */}
//       {selectedVideo && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: "rgba(0,0,0,0.95)",
//             zIndex: 10000,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//           onClick={() => setSelectedVideo(null)}
//         >
//           <button
//             onClick={() => setSelectedVideo(null)}
//             style={{
//               position: "absolute",
//               top: "20px",
//               right: "20px",
//               background: "rgba(255,255,255,0.2)",
//               border: "none",
//               borderRadius: "50%",
//               width: "45px",
//               height: "45px",
//               cursor: "pointer",
//               color: "white",
//               fontSize: "20px",
//             }}
//           >
//             <FaTimes />
//           </button>

//           <div
//             style={{
//               width: "80vw",
//               maxWidth: "1000px",
//               aspectRatio: "16 / 9",
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <ReactPlayer
//               url={selectedVideo.url}
//               width="100%"
//               height="100%"
//               controls
//               playing
//             />
//           </div>
//         </motion.div>
//       )}
//     </>
//   );
// };

// export default VideoGallery;
