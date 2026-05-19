import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaImage } from 'react-icons/fa';

const ImageCarousel = ({ images, title, onOpenModal, project }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Safe check - ensure images is an array
  const hasImages = images && Array.isArray(images) && images.length > 0;

  // Auto-slide effect (only if multiple images)
  useEffect(() => {
    if (hasImages && images.length > 1) {
      const timer = setInterval(() => {
        nextImage();
      }, 3000); // Change image every 5 seconds
      return () => clearInterval(timer);
    }
  }, [hasImages, images?.length]);

  const nextImage = () => {
    if (!hasImages) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (!hasImages) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    if (!hasImages) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  // If no images array or empty, use single image or fallback
  if (!hasImages) {
    return (
      <div className="relative h-48 w-full bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden group">
        {project?.image ? (
          <img
            src={project.image}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <FaImage size={48} className="text-white opacity-50 mb-2" />
            <p className="text-white text-sm font-medium">{title}</p>
          </div>
        )}
        {/* Quick View Button */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center pointer-events-none">
          <button
            onClick={() => onOpenModal?.(project)}
            className="pointer-events-auto opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-300 px-4 py-2 bg-white text-gray-900 rounded-lg font-medium"
          >
            Quick View
          </button>
        </div> */}
      </div>
    );
  }

  return (
    <div className="relative h-48 w-full bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden group">
      {/* Image Container with Animation */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={images[currentIndex]}
            alt={`${title} - ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error('Image failed to load:', images[currentIndex]);
              e.target.style.display = 'none';
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Image Counter */}
      <div className="absolute top-2 right-2 z-10 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-1 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
            aria-label="Previous image"
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-1 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
            aria-label="Next image"
          >
            <FaChevronRight size={20} />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10 flex gap-1">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToImage(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                idx === currentIndex
                  ? 'bg-white w-3'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Quick View Button */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center pointer-events-none">
        <button
          onClick={() => onOpenModal?.(project)}
          className="pointer-events-auto opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-300 px-4 py-2 bg-white text-gray-900 rounded-lg font-medium"
        >
          Quick View
        </button>
      </div> */}
    </div>
  );
};

export default ImageCarousel;
