import Image from "next/image";
import PagesLoader from "../components/PagesLoader";
import Link from "next/link";

export default function About() {
  return (
    <PagesLoader >
          <div className="flex items-center justify-center pt-[100px]">
        <div className="flex flex-col">
          <h2 className="text-center text-5xl text-black animate__animated animate__bounceInDown">Yarik (J-2099)</h2>
          <Image src="/me.jpg" alt="" width={300} height={600} className="rounded-2xl animate__animated animate__flipInY"></Image>
          <div>
            <div className="flex gap-2 items-center animate__animated animate__bounceInLeft">
              <p className="text-black text-2xl font-semibold">Status:</p>
              <p className="text-2xl font-medium">Alive</p>
            </div>
            <div className="flex gap-2 items-center animate__animated animate__bounceInRight">
              <p className="text-black text-2xl font-semibold">Species:</p>
              <p className="text-2xl font-medium">Robot</p>
            </div>
            <div className="flex gap-2 items-center animate__animated animate__bounceInLeft">
              <p className="text-black text-2xl font-semibold">Gender:</p>
              <p className="text-2xl font-medium">Genderless</p>
            </div>
            <div className="flex gap-2 items-center animate__animated animate__bounceInRight">
              <p className="text-black text-2xl font-semibold">Origin:</p>
              <p className="text-2xl font-medium">Earth (C-137)</p>
            </div>
            <div className="flex gap-2 items-center animate__animated animate__bounceInLeft">
              <p className="text-black text-2xl font-semibold">Location:</p>
              <p className="text-2xl font-medium">Planet Squanch</p>
            </div>
            <div className="flex gap-2 items-center animate__animated animate__bounceInRight">
              <p className="text-black text-2xl font-semibold">Link to my</p>
              <Link href="https://www.linkedin.com/in/yaroslav-avramidi-781146323/" target="_blank" className="text-2xl font-medium hover:text-[#EDC5AB]">LinkedIn Profile</Link>
            </div>
          </div>
      </div>
    </div>
    </PagesLoader>
  )
}