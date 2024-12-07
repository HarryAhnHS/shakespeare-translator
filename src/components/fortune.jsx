import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHatWizard, faXmark } from "@fortawesome/free-solid-svg-icons";
import fortunes from "../models/fortunes.json";
import witchQuotes from "../models/witchQuotes.json";
import witchIcon from '../assets/witch.png';

function Fortune() {
    const [fortune, setFortune] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState(null);

    const [isTextVisible, setIsTextVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);  // State to control animation
    const [witchQuote, setWitchQuote] = useState(null);

    // Function to randomize witch quote
    const randomizeWitchQuote = () => {
        const randomIdx = Math.floor(Math.random() * witchQuotes.length);
        setWitchQuote(witchQuotes[randomIdx]);
    };

    useEffect(() => {
        // Start the cycle on component mount
        const cycleAnimation = () => {
            setIsAnimating(true);
            setIsTextVisible(true); // Show text during the animation phase

            // After 5 seconds, reset everything back to still
            setTimeout(() => {
                setIsAnimating(false);
                setIsTextVisible(false); // Hide text after animation
            }, 5000);

            // Repeat the cycle every 15 seconds (10 seconds still, 5 seconds animated)
            setTimeout(cycleAnimation, 15000);
        };

        // Start the animation cycle
        cycleAnimation();

        // Cleanup the cycle if the component is unmounted
        return () => clearTimeout(cycleAnimation);
    }, []);

    // Randomize witch quote
    useEffect(() => {
        randomizeWitchQuote();
    },[]);

    // Hash function to map a name to a fortune
    const hashNameToFortune = (name) => {
        const hash = [...name].reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return fortunes[hash % fortunes.length];
    };

    // Handle name input and generate fortune
    const handleGenerateFortune = (name) => {
        if (name.trim()) {
            const result = hashNameToFortune(name);
            setFortune(result);
        } else {
            setFortune(null);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center text-sm md:text-lg">
            {/* Animated Button */}
            <motion.button
                onClick={() => {setIsModalOpen(true)}}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="text-sm relative flex items-center justify-center w-10 h-10 bg-indigo-900 rounded-lg hover:bg-indigo-950 focus:outline-none"
            >
                {/* Icon Animation */}
                <motion.div
                    animate={{
                        rotate: isAnimating ? [0, -15, 15, -10, 10, -9, 9, -8, 8, -5, 5, 3, -3, 2, -2, 1, -1, 0] : 0,  // Wiggle animation when active
                        color: isAnimating ? "#f6f456" : "#FFFFFF",  // Wiggle animation when active
                    }}
                    transition={{
                        rotate: {
                            repeat: 1,  // Set repeat to 1 to prevent extra flashes
                            repeatType: "reverse",  // Ensure the animation reverses after the cycle
                            duration: 1.5,  // 1.5 seconds duration for the animation cycle
                        },
                        color: {
                            duration: 0.25
                        }
                    }}
                    >
                    <FontAwesomeIcon icon={faHatWizard} />
                </motion.div>


                {/* Conditional text visibility */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: isTextVisible ? 1 : 0,  // Show or hide text
                        y: isTextVisible ? 0 : 10,  // Smooth slide up effect when showing
                    }}
                    transition={{
                        opacity: { 
                            duration: 0.5
                        },
                        y: { 
                            duration: 0.5
                        },
                    }}
                    className="absolute bottom-10 w-auto px-4"
                >
                    <div className="relative">
                        <span className="block text-[9px] font-bold text-indigo-600 whitespace-nowrap">
                            {witchQuote}
                        </span>
                    </div>
                </motion.div>
            </motion.button>

        {/* Modal with Animation */}
        <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md py-12"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="z-50 absolute top-3 right-3 h-8 px-2 flex items-center justify-center text-gray-700 bg-gray-100 rounded-lg border border-gray-300 hover:bg-gray-200"
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </button>

                            {/* Witch Icon Background */}
                            <div className="absolute inset-0 opacity-[0.08]">
                                <img
                                    src= {witchIcon}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="relative">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Macbeth&apos;s Witches Speak</h2>
                                <p className="italic text-gray-500 mb-4">
                                    &quot;Double, double, toil and trouble; Fire burn, and cauldron bubble!&quot;
                                </p>

                                {!fortune && (
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        value={name}
                                        className="w-full h-10 px-4 mb-4 text-gray-700 bg-gray-100 rounded-lg border border-gray-300 focus:ring-4 focus:ring-indigo-300 focus:outline-none"
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") handleGenerateFortune(e.target.value);
                                        }}
                                    />
                                )}
                                {fortune && (
                                    <div>
                                        <p className="text-lg italic font-bold text-gray-800 mb-2">&quot;{fortune.quote}&quot;</p>
                                        <p className="text-right text-sm text-gray-500">- {fortune.play}</p>
                                    </div>
                                )}
                                <div className="flex justify-between mt-8 text-base">
                                    {fortune ? 
                                        <button
                                            onClick={() => setFortune(null)}
                                            className="flex justify-center items-center h-10 px-4 text-gray-700 bg-gray-100 rounded-lg border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:ring-red-300 focus:outline-none"
                                        >
                                            Try Again
                                        </button>
                                        :
                                        <button
                                            onClick={() => {
                                                if (name) handleGenerateFortune(name);
                                            }}
                                            className="flex justify-center items-center h-10 px-4 text-gray-100 bg-indigo-600 rounded-lg border border-indigo-300 hover:bg-indigo-700 focus:outline-none"
                                        >
                                            Get Prophecy
                                        </button>
                                    }
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Fortune;
