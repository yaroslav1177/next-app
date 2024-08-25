import Image from "next/image";

const AnotherLoader = () => {
  return (
    <div className="loader">
      <Image src='/icon3.png' alt="spiner" width={250} height={250}/>
    </div>
  );
};

export default AnotherLoader;
