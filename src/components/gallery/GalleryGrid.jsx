/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Masonry from "react-masonry-css";
import ImageModal from "./ImageModal";
import CategoryFilter from "./CategoryFilter";
import { FaPlay, FaTimes } from "react-icons/fa";

// Import your local images
import training1 from "../../assests/images/gallery/drone_7.png";
import training2 from "../../assests/images/gallery/drone_8.png";
import pilot1 from "../../assests/images/gallery/drone10.png";
import aerial1 from "../../assests/images/gallery/drone4.jpg";
import event1 from "../../assests/images/gallery/drone5.jpg";
import tech1 from "../../assests/images/gallery/drone_9.png";
import drone1 from "../../assests/images/gallery/drone1.png";

const GalleryGrid = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");
  const videoRef = useRef(null);

  const videoThumbnail = "/videos/poster.jpg";

  const galleryItems = [
    // Video Item
    {
      id: 0,
      src: "/videos/my-drone-force-video.mp4",
      thumbnail: videoThumbnail,
      title: "Welcome to My Drone Force",
      category: "featured",
      type: "video",
      duration: "2:30",
    },
    // Partnership Images - TCB Drones
    {
      id: 7,
      src: drone1,
      title: "MyDroneForce.com Drones help in agriculture",
      subtitle: "Strategic Partnership for Drone Education",
      category: "agricultural",
      type: "image",
    },
    // {
    //   id: 8,
    //   src: tcb2,
    //   title: "TCB Drones Academy Collaboration",
    //   subtitle: "Joint Training Program Launch",
    //   category: "partnerships",
    //   type: "image",
    // },
    // {
    //   id: 9,
    //   src: tcb3,
    //   title: "TCB Drones Partnership Ceremony",
    //   subtitle: "Official Signing Event",
    //   category: "partnerships",
    //   type: "image",
    // },
    // Regular Gallery Images
    {
      id: 1,
      src: training1,
      title: "Drone Flight Training",
      category: "training",
      type: "image",
    },
    {
      id: 2,
      src: training2,
      title: "Hands-On Practice",
      category: "training",
      type: "image",
    },
    {
      id: 3,
      src: pilot1,
      title: "Professional Pilot",
      category: "pilots",
      type: "image",
    },
    {
      id: 4,
      src: aerial1,
      title: "Aerial Photography",
      category: "aerial",
      type: "image",
    },
    {
      id: 5,
      src: event1,
      title: "Drone Racing Event",
      category: "events",
      type: "image",
    },
    {
      id: 6,
      src: tech1,
      title: "Drone Technology",
      category: "tech",
      type: "image",
    },
  ];

  const categories = [
    { id: "all", name: "All", icon: "📸", count: galleryItems.length },
    {
      id: "featured",
      name: "Featured",
      icon: "⭐",
      count: galleryItems.filter((i) => i.category === "featured").length,
    },
    {
      id: "agricultural",
      name: "Agricultural",
      icon: "🤝",
      count: galleryItems.filter((i) => i.category === "agricultural").length,
    },
    {
      id: "training",
      name: "Training",
      icon: "🎓",
      count: galleryItems.filter((i) => i.category === "training").length,
    },
    {
      id: "pilots",
      name: "Pilots",
      icon: "👨‍✈️",
      count: galleryItems.filter((i) => i.category === "pilots").length,
    },
    {
      id: "aerial",
      name: "Aerial",
      icon: "🏔️",
      count: galleryItems.filter((i) => i.category === "aerial").length,
    },
    {
      id: "events",
      name: "Events",
      icon: "🎪",
      count: galleryItems.filter((i) => i.category === "events").length,
    },
    {
      id: "tech",
      name: "Technology",
      icon: "🔧",
      count: galleryItems.filter((i) => i.category === "tech").length,
    },
  ];

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const breakpointColumns = {
    default: 4,
    1200: 3,
    900: 2,
    600: 1,
  };

  const handleItemClick = (item, index) => {
    if (item.type === "video") {
      setSelectedVideo(item);
    } else {
      setSelectedImage(item);
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setSelectedImage(filteredItems[newIndex]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setSelectedImage(filteredItems[newIndex]);
    }
  };

  // Video Modal Component
  const VideoModal = () => {
    if (!selectedVideo) return null;

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.95)",
          zIndex: 10000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => setSelectedVideo(null)}
      >
        <button
          onClick={() => setSelectedVideo(null)}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "rgba(255,255,255,0.2)",
            border: "none",
            borderRadius: "50%",
            width: "45px",
            height: "45px",
            cursor: "pointer",
            color: "white",
            fontSize: "20px",
            zIndex: 10001,
          }}
        >
          <FaTimes />
        </button>

        <div
          style={{
            width: "80vw",
            maxWidth: "1000px",
            backgroundColor: "#000",
            borderRadius: "12px",
            overflow: "hidden",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <video
            ref={videoRef}
            src={selectedVideo.src}
            controls
            autoPlay
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
            poster={selectedVideo.thumbnail}
          />
        </div>
      </div>
    );
  };

  return (
    <section id="gallery" style={{ background: "var(--bg-primary)" }}>
      <div className="container-custom" style={{ padding: "60px 0" }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-5"
        >
          <span
            style={{
              background: "var(--gradient)",
              padding: "6px 16px",
              borderRadius: "50px",
              display: "inline-block",
              marginBottom: "15px",
              color: "white",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            OUR GALLERY
          </span>
          <h2 className="display-4 fw-bold mb-3 gradient-text">
            Moments That Inspire
          </h2>
          <p
            className="lead"
            style={{
              color: "var(--text-secondary)",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Explore our drone training sessions, partnerships, and aerial
            photography
          </p>
        </motion.div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Masonry Grid */}
        <Masonry
          breakpointCols={breakpointColumns}
          className="masonry-grid-full"
          columnClassName="masonry-grid-column-full"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="gallery-item-full"
              style={{
                marginBottom: "20px",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                borderRadius: "16px",
              }}
              onClick={() => handleItemClick(item, index)}
            >
              {item.type === "video" ? (
                <>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      transition: "transform 0.5s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "60px",
                      height: "60px",
                      background: "rgba(0,0,0,0.7)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      pointerEvents: "none",
                    }}
                  >
                    <FaPlay
                      style={{
                        color: "white",
                        fontSize: "24px",
                        marginLeft: "4px",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                      background: "rgba(0,0,0,0.7)",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      color: "white",
                    }}
                  >
                    {item.duration}
                  </div>
                </>
              ) : (
                <img
                  src={item.src}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    transition: "transform 0.5s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              )}

              {/* Overlay */}
              <div
                className="gallery-overlay-full"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "20px",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                  transform: "translateY(100%)",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(100%)")
                }
              >
                <h4
                  style={{
                    color: "white",
                    marginBottom: "5px",
                    fontSize: "16px",
                  }}
                >
                  {item.title}
                </h4>
                {item.subtitle && (
                  <p
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      fontSize: "11px",
                      marginBottom: "5px",
                    }}
                  >
                    {item.subtitle}
                  </p>
                )}
                <p
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "12px",
                    margin: 0,
                  }}
                >
                  {categories.find((c) => c.id === item.category)?.name}
                  {item.type === "video" && " • Video"}
                </p>
              </div>
            </motion.div>
          ))}
        </Masonry>
      </div>

      {/* Image Modal */}
      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={currentIndex < filteredItems.length - 1}
        hasPrev={currentIndex > 0}
      />

      {/* Video Modal */}
      <VideoModal />

      <style jsx>{`
        .masonry-grid-full {
          display: flex;
          margin-left: -20px;
          width: auto;
        }
        .masonry-grid-column-full {
          padding-left: 20px;
          background-clip: padding-box;
        }
        .gallery-item-full {
          transition: all 0.3s ease;
        }
        .gallery-item-full:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
        .gallery-item-full:hover .gallery-overlay-full {
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
};

export default GalleryGrid;
