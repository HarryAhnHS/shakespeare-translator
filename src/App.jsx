import './App.css';
import Translator from './components/translator';

function App() {
  return (
    <>
      <div className="flex flex-col h-screen bg-gray-50">
        <main className="flex-grow flex justify-center sm:px-24 sm:py-16">
          <div className="w-full bg-white shadow-lg rounded-lg py-6 max-w-[1000px]">
            <Translator />
          </div>
        </main>

      </div>
    </>
  );
}

export default App;
