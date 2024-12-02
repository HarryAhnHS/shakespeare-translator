function Output({output}) {

    return (
    <div className="relative flex-1">
        <div className="absolute left-4 top-4 text-sm text-gray-400 scale-75 origin-top-left">Shakespearean</div>
        <textarea type="textarea" id="inputTxt" placeholder="Output will show here" value={output} disabled className="w-full h-full bg-gray-100 rounded p-4 pt-10 shadow-sm"/>
    </div>
    )
  }
  
  export default Output;
  