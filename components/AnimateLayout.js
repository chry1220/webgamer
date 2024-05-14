// Layout.js
import { motion } from "framer-motion";

const AnimateLayout = ({ children, key }) => {
    return (
        <motion.div
            key={key}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.2 }}
        >
            {children}
        </motion.div>
    );
};

export default AnimateLayout;
