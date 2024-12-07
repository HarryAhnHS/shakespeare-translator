import Fortune from "./fortune";


function Head() {
    return (
        <div className="relative flex flex-col items-center justify-center bg-transparent py-8 sm:py-4">
            <h1 className="text-3xl tracking-tight font-light">
                Shakespeare Translator
            </h1>
            <Fortune />
        </div>
    );
}

export default Head;
