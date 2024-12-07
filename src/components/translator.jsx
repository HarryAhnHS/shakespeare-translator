import { useEffect, useState } from "react";
import Input from "./input";
import Output from "./output";
import Toolbar from "./toolbar";
import Head from "./head";

function Translator() {
    const [wordCount, setWordCount] = useState(0);
    const [input, setInput] = useState(""); // User's input
    const [output, setOutput] = useState(""); // Translated text
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        function updateWordCount() {
            // Count words
            if (input.trim() === "") {
                setWordCount(0);
            } else {
                const wordCount = input.trim().split(/\s+/).length;
                setWordCount(wordCount <= 1000 ? wordCount : 1000); // Limit word count to 1000
            }
        };
        updateWordCount();
    }, [input])

    const onTranslate = async () => {
        setLoading(true);
        const TRANSLATE_API_URL = "https://api.funtranslations.com/translate/shakespeare.json";
        
        try {
            const response = await fetch(`${TRANSLATE_API_URL}?text=${encodeURIComponent(input)}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "X-Funtranslations-Api-Secret": import.meta.env.VITE_TRANSLATION_API_KEY
                },
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            setOutput(data.contents.translated || "");
        } catch (error) {
            console.error(`Error translating: ${error.message}`);
            setOutput("Error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const onReset = () => {
        setInput("");
        setOutput("");
    };

    const onCopy = (text) => {
        if (!text) {
            return;
        }
        navigator.clipboard.writeText(text)
            .then()
            .catch();
    };

    const onRandomQuote = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "X-Api-Key": "5GOGcIKJ70yp6YNjY2H2Pg==YpFZX8XEWeTGN1lC"
                },
            })
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            const data = await response.json();
            setInput(data[0].quote);
        }
        catch(error) {
            console.log(`Error: ${error}`)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="w-full h-full">
                <div className="relative h-full flex flex-col px-8 md:px-12">
                    <Head />
                    <Toolbar output={output} onTranslate={onTranslate} onReset={onReset} onCopy={onCopy} onRandomQuote={onRandomQuote} loading={loading}/>
                    <div className="flex-1 flex flex-col md:flex-row justify-center gap-8 md:gap-4 my-6 md:my-4">
                        <Input input={input} setInput={setInput} setWordCount={setWordCount} loading={loading}/>
                        <Output output={output} loading={loading}/>
                    </div>
                    <div className="text-xs text-gray-600">
                        <span>Word Count: {wordCount}</span>
                        <span className="ml-1 text-indigo-600">(Max 1000)</span>
                    </div>
                    <div className="flex flex-col justify-between items-center mt-10 text-black text-sm space-y-4 md:space-y-0">
                        {/* Developer Information */}
                        <div className="text-center text-xs">
                            <div>
                                Developed by{" "}
                                <a 
                                    href="https://github.com/HarryAhnHS" 
                                    target="_blank" 
                                    className="font-semibold hover:text-indigo-400 underline">
                                    @HarryAhnHS
                                </a>
                            </div>

                            <div>
                                with{" "}
                                <a 
                                    href="https://catalogue.usc.edu/preview_course_nopop.php?catoid=12&coid=179276" 
                                    target="_blank" 
                                    className="italic hover:text-indigo-400 underline">
                                    ENGL230 - Shakespeare and His Times
                                </a>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Translator;
