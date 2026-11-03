import { motion, useReducedMotion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  duration: 0.5,
  ease: "easeInOut",
};

export default function PageTransition({ children }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : "initial"}
      animate="animate"
      exit={reduceMotion ? undefined : "exit"}
      variants={pageVariants}
      transition={reduceMotion ? { duration: 0 } : pageTransition}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
