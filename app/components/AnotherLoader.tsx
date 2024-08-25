import Image from "next/image";

// components/Loader.js
const AnotherLoader = () => {
  return (
    <div className="loader">
      {/* <p className='text-2xl md:text-8xl'>Another loader</p> */}
      <Image src='/icon3.png' alt="spiner" width={250} height={250}/>
    </div>
  );
};

export default AnotherLoader;
