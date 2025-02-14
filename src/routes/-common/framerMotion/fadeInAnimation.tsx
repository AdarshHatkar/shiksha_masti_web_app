import { AnimatePresence, motion } from "framer-motion";

type FadeInAnimationPropsType = {
    children: React.ReactNode;
};

export function FadeInAnimation({ children }: FadeInAnimationPropsType) {
    return (
        <>
            <AnimatePresence mode="popLayout">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </>
    );
}
