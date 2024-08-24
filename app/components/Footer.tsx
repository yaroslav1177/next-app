import NextIcon from "../../public/next.svg";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="w-full bg-[#8B9D77] border-t-4 border-black mt-5 py-4">
      <div className="flex items-start pl-28 sm:pl-0 md:items-center md:items-center flex-col sm:flex-row gap-6 justify-between w-[500px] mx-auto text-black text-2xl">
        <div className="flex flex-col">
          <a href="https://nextjs.org/" target="_blank">
            <p>Created on</p>
            <Image
              src="/next.svg"
              alt="next logo"
              width={100}
              height={100}
              className="block mt-2"
            />
          </a>
        </div>
        <div>
          <a href="https://vercel.com/home" target="_blank">
            <p>Deployed on</p>
            <Image
              src="/vercel.svg"
              alt="next logo"
              width={100}
              height={100}
              className="block mt-2"
            />
          </a>
        </div>
        <div>
          <a href="https://github.com/yaroslav1177/next-app" target="_blank">
            <p>GitHub Repo</p>{" "}
            <Image
              src="/github.png"
              alt="next logo"
              width={100}
              height={100}
              className="block mt-0"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
