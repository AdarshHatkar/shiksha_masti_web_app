import { AnimatePresence, motion } from "framer-motion";

type SlideInOutAnimationPropsType = {
    children: React.ReactNode;
    direction?: "left" | "right";
};

export function SlideInOutAnimation({ children, direction = "left" }: SlideInOutAnimationPropsType) {
    return (
        <AnimatePresence>
            <motion.div
                initial={{
                    x: direction === "left" ? "-100%" : "100%",
                    opacity: 0,
                }}
                animate={{ x: 0, opacity: 1 }}
                exit={{
                    x: direction === "left" ? "-100%" : "100%",
                    opacity: 0,
                }}
                transition={{ duration: 0.5 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
