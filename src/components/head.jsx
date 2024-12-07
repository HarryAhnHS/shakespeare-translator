import { faFeatherPointed } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Head() {
    return (
        <div className="relative flex flex-col items-center justify-between bg-transparent pb-8 pt-5">
            <div className="flex-1 flex items-center justify-center gap-2 text-indigo-900 text-3xl tracking-tight font-semibold">
                <FontAwesomeIcon icon={faFeatherPointed} className="text-2xl"/>
                <span>Shakespeare<span className="font-light">Translator</span></span>
            </div>
        </div>
    );
}

export default Head;