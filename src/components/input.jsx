function Input({ input, setInput }) {

  function handleInputChange(e) {
      const value = e.target.value;
      setInput(value);
  }

  return (
    <div className="relative flex-1 group">
      {/* Label with group focus effect */}
      <label
          htmlFor="inputTxt"
          className="absolute left-4 top-4 text-sm text-gray-400 transition-all duration-300 ease-in-out transform scale-75 origin-top-left
              group-focus-within:scale-75 group-focus-within:top-4 group-focus-within:text-indigo-600 group-focus-within:font-bold"
      >
          English
      </label>

      {/* Textarea with focus effect */}
      <textarea
          onChange={(e) => handleInputChange(e)}
          id="inputTxt"
          placeholder="Write here..."
          value={input}
          className="w-full h-full bg-gray-100 rounded p-4 pt-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600
              transition-all duration-300 ease-in-out"
      />
  </div>
  );
}

export default Input;
