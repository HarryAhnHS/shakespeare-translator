import { faCopy, faRightLong, faRotateRight, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Fortune from "./fortune";

function Toolbar({ output, onCopy, onReset,onTranslate, onRandomQuote }) {
    return (
        <div className="flex justify-between items-center gap-4 text-xs md:text-sm">
          {/* Reset Button */}
            <div className="flex-1 flex gap-4">
                <div className="relative group">
                    <button
                        onClick={onRandomQuote}
                        className="flex justify-center items-center h-10 px-4 text-gray-700 bg-gray-100 rounded-lg border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-red-300"
                    >
                        <FontAwesomeIcon icon={faWandMagicSparkles} />
                        <span className="ml-2">Ideas?</span>
                    </button>
                </div>
                <div className="relative group">
                    <button
                        onClick={onReset}
                        className="flex justify-center items-center w-10 h-10 text-gray-700 bg-gray-100 rounded-lg border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-red-300"
                    >
                        <FontAwesomeIcon icon={faRotateRight} />
                    </button>
                </div>
            </div>
            <div>
                <Fortune />
            </div>
            <div className="flex-1 flex justify-end gap-4">
              {/* Copy Button */}
              <div className="relative group">
                  <button
                      onClick={() => onCopy(output)}
                      className="flex justify-center items-center w-10 h-10 text-gray-700 bg-gray-100 rounded-lg border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                      <FontAwesomeIcon icon={faCopy} />
                  </button>
              </div>

              {/* Translate Button */}
              <div className="relative group">
                  <button
                      onClick={onTranslate}
                      className="flex items-center h-10 px-4 text-white bg-indigo-900 rounded-lg hover:bg-indigo-950 focus:ring-4 focus:ring-indigo-300 focus:outline-none"
                  >
                      <span className="mr-2">Translate</span>
                      <FontAwesomeIcon icon={faRightLong} />
                  </button>
              </div>
            </div>
        </div>
    );
}

export default Toolbar;
