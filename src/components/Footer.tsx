import Link from "next/link"

export function Footer( {onclick} : {onclick: (page: string) => void}) {
  return (
    <footer className="text-white mt-[80px] mx-auto max-w-[1000px]">
      <div className="flex flex-col sm:flex-row gap-y-[20px] justify-evenly md:justify-between items-center mx-8">
          {/* Left Column - Brand */}
          <div className="text-center sm:text-left">
            <h2 className="text-[30px] font-comfortaa font-bold mb-[10px] ">Table Turnerr</h2>
            <p className="text-normal3 text-white/70 max-w-[350px] mb-[20px]">
              A digital marketing agency specializing in enhancing the online presence of restaurants
            </p>
            <div className="flex justify-center sm:justify-start flex-wrap gap-[15px] max-w-[350px]">
              <Link
                href="#"
                className="inline-flex items-center justify-center px-[22px] py-1 text-[16px] border text-white/50 border-white/35 bg-white/10 rounded-[5px] hover:text-white/80 hover:border-white/45 hover:ring hover:font-medium hover:bg-white/15 ring-white/50  transition-all"
              >
                Instagram
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center px-[22px] py-1 text-[16px] border text-white/50 border-white/35 bg-white/10 rounded-[5px] hover:text-white/80 hover:border-white/45 hover:ring hover:font-medium hover:bg-white/15 ring-white/50  transition-all"
              >
                WhatsApp
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center px-[22px] py-1 text-[16px] border text-white/50 border-white/35 bg-white/10 rounded-[5px] hover:text-white/80 hover:border-white/45 hover:ring hover:font-medium hover:bg-white/15 ring-white/50  transition-all"
              >
                Phone
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center px-[22px] py-1 text-[16px] border text-white/50 border-white/35 bg-white/10 rounded-[5px] hover:text-white/80 hover:border-white/45 hover:ring hover:font-medium hover:bg-white/15 ring-white/50  transition-all"
              >
                Mail
              </Link>
            </div>
          </div>


          <div className="flex w-full justify-start sm:justify-evenly flex-col sm:flex-row items-start gap-[20px] ">
          {/* Middle Column - Links */}
            <div className="flex row items-center">  
              <div className="relative w-[45px] h-full">
                <div className="absolute top-[50%] -translate-y-[50%]  text-h5 font-semibold italic tracking-wide -rotate-90">Links</div>
              </div>
              <div className="w-[1px] min-h-[100px] mr-4 bg-white"/>
              <nav className="flex flex-col h-full justify-between text-h5 font-medium">
                <div onClick={() => onclick("Home")} className="text-gray-300 hover:text-white transition-colors">
                  Home
                </div>
                <div onClick={() => onclick("Solutions")} className="text-gray-300 hover:text-white transition-colors">
                  Solutions
                </div>
                <div onClick={() => onclick("Products")} className="text-gray-300 hover:text-white transition-colors">
                  Products
                </div>
                <div onClick={() => onclick("Price")} className="text-gray-300 hover:text-white transition-colors">
                  Price
                </div>
                <div onClick={() => onclick("Reviews")} className="text-gray-300 hover:text-white transition-colors">
                  Reviews
                </div>
                <div onClick={() => onclick("Contact")} className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </div>
              </nav>
            </div>

            {/* Right Column - Contact */}
            <div className="flex w-fit items-center h-[70px]">
              <div className="relative w-[45px] h-full">
                <div className="absolute top-[50%] -right-5 -translate-y-[50%] text-h5 font-semibold italic tracking-wide -rotate-90">Contact</div>
              </div>
              <div className="w-[1px] h-full mr-4 bg-white"/>
              <a href="mailto:contact@tableturnerr.com" className="text-gray-300 hover:text-white transition-colors">
                contact@tableturnerr.com
              </a>
            </div>
          </div>
      </div>
      <div className="w-[80%] mt-[70px] mx-auto h-[30px] border-t border-white/10 bg-radial from-white/5 to-70% to-transparent flex items-center justify-center text-sm text-center text-white/50 ">
        Copyright © 2025 -&nbsp;<span className="font-semibold ">TableTurnerr</span>
      </div>
    </footer>
  )
}
