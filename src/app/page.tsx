"use client";

import Header from "@/components/Header";
import { linearGradient } from "framer-motion/client";
import Image from "next/image";

import mock from "@/../public/images/Ropes Laptop Mockup.png"
import Review_card from "@/components/Review_card";
import MovingGradientBackground from "@/components/MovingGradient";
import ThemeButton from "@/components/ThemeButton";
import { useEffect, useRef } from "react";
import { Footer } from "@/components/Footer";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null); // Renamed from stopRef for clarity
  const isStoppingRef = useRef(false); // Ref to track if we are in the "stopping" state
  const observerRef = useRef<IntersectionObserver | null>(null); // Ref to hold the observer instance
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref for the pause timeout
  const hasTriggeredOnceRef = useRef(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.warn(`Scroll target not found: #${sectionId}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return; // Keep check for robustness

    const blockScroll = (e: Event) => {
      if (isStoppingRef.current) {
        console.log("Blocking scroll on window"); // Debugging
        e.preventDefault();
      }
    };

    const releaseLock = () => {
      console.log("Releasing lock from window"); // Debugging
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = null;
      }
      // *** Remove listeners from window ***
      window.removeEventListener('wheel', blockScroll);
      window.removeEventListener('touchmove', blockScroll);
      isStoppingRef.current = false;

      setTimeout(() => {
        if (observerRef.current && section && !isStoppingRef.current && !hasTriggeredOnceRef.current) {
          observerRef.current.observe(section);
        }
      }, 3000);
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isStoppingRef.current  && !hasTriggeredOnceRef.current) {
          console.log("Intersection detected - starting stop sequence");
          isStoppingRef.current = true;
          hasTriggeredOnceRef.current = true;

          // *** Add listeners to window ***
          window.addEventListener('wheel', blockScroll, { passive: false });
          window.addEventListener('touchmove', blockScroll, { passive: false });

          if (observerRef.current) {
            observerRef.current.unobserve(section);
          }

          section.scrollIntoView({ behavior: 'smooth', block: 'start' });

          const pauseDuration = 3000;
          pauseTimeoutRef.current = setTimeout(releaseLock, pauseDuration);

        } else if (!entry.isIntersecting && isStoppingRef.current) {
          console.log("Scrolled out during intended pause - releasing lock early");
          releaseLock();
        }
      });
    };

    const observerOptions = {
      root: null,
      threshold: 0.5,
    };

    if (!hasTriggeredOnceRef.current) {
      observerRef.current = new IntersectionObserver(handleIntersection, observerOptions);
      observerRef.current.observe(section);
    }

    // --- Cleanup Function ---
    return () => {
      console.log("Cleaning up scroll observer and window listeners"); // Debugging
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
      // *** Ensure listeners are removed from window ***
      window.removeEventListener('wheel', blockScroll);
      window.removeEventListener('touchmove', blockScroll);
      isStoppingRef.current = false;
    };
  }, []); // Dependencies remain empty


  return (
    <div 
      ref={containerRef}
      className="overflow-y-auto scroll-behavior-smooth"
    >
      <div className="fixed w-screen z-50">
        <Header />
      </div>

      {/* Hero Section */}
      <div id="Home" className="h-screen flex items-center">
        <div className="h-screen max-h-[600px] lg:max-h-[820px] w-screen px-[20px] sm:px-[60px] pt-[70px] sm:pt-[40px] md:pt-[70px] pb-[32px] flex items-center">
          <div className="flex flex-col items-center justify-between h-full w-full">
            <div
              className="text-black w-full font-creto-black text-[40px] sm:text-[50px] md:text-[60px] lg:text-[70px] xl:text-hero text-left font-black leading-[1.1] mb-2"
              style={{
                letterSpacing: "-1px",
                textTransform: "uppercase",
              }}
            >
              You Cook,
              <br />
              We Bring Customers
              <br />
              <p className="text-primary">Free for 23 days</p>
            </div>

            <div className="max-w-[1200px] text-normal3 sm:text-normal2 md:text-normal1 flex flex-col sm:flex-row justify-center items-center text-center gap-[20px] text-black/90">
              <div className="">
                Start seeing new customers in under 7 days- without paid ads
                -Transform your restaurant in under 90 days
              </div>
              <div className="hidden sm:block">
                We only win if you do — if we don’t make you $2,000+ in lifetime
                customer value in the free trial, we’ll keep working for free
                until we do.
              </div>
            </div>

            <div className="text-[20px] sm:text-[28px] md:text-[32px] font-semibold text-black w-full text-center mt-[35px]">
              <i>
                Feel the <span className="text-primary">Results</span>, Before
                you Feel the <span className="text-primary-orange">Cost</span>.
              </i>
            </div>

            <div className="flex flex-col just sm:flex-row gap-[10px] mt-[10px] sm:mt-[32px]">
              <div className="flex py-[5px] pl-[21px] pr-[5px] items-center justify-between gap-[10px] rounded-[9px] border-black border-[1px] group overflow-hidden ">
                <div className="font-bold text-normal1">Tell Me Moree</div>
                <div className="flex h-[34px] w-[34px] p-[11] justify-center items-center gap-[13px] rounded-[8px] bg-black">
                  <div className="group-hover:scale-250 group-hover:translate-x-[-40%] group-hover:translate-y-[40%] transition-all duration-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="14"
                      viewBox="0 0 15 14"
                      fill="none"
                    >
                      <path
                        d="M0.928184 12.2531C0.575703 12.6056 0.575703 13.177 0.928184 13.5295C1.28066 13.882 1.85215 13.882 2.20463 13.5295L0.928184 12.2531ZM14.2516 1.10873C14.2516 0.610242 13.8475 0.206142 13.349 0.206143L5.22573 0.206142C4.72725 0.206142 4.32315 0.610242 4.32315 1.10873C4.32315 1.60721 4.72725 2.01131 5.22573 2.01131H12.4464V9.23197C12.4464 9.73045 12.8505 10.1346 13.349 10.1346C13.8475 10.1346 14.2516 9.73046 14.2516 9.23197L14.2516 1.10873ZM2.20463 13.5295L13.9872 1.74695L12.7108 0.470502L0.928184 12.2531L2.20463 13.5295Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex py-[5px] pl-[21px] pr-[5px] items-center justify-between gap-[10px] rounded-[9px] bg-primary group">
                <div className="font-bold text-normal1 text-white">
                  Book a Free Demo{" "}
                  <span className="hidden sm:inline-block">Already</span>
                </div>
                <div className="flex h-[34px] w-[34px] p-[11] justify-center items-center gap-[13px] rounded-[8px] bg-black overflow-hidden border-black border-2">
                  <div className="group-hover:scale-250 group-hover:translate-x-[-40%] group-hover:translate-y-[40%] transition-all duration-500 overflow-hidden">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="14"
                      viewBox="0 0 15 14"
                      fill="none"
                    >
                      <path
                        d="M0.928184 12.2531C0.575703 12.6056 0.575703 13.177 0.928184 13.5295C1.28066 13.882 1.85215 13.882 2.20463 13.5295L0.928184 12.2531ZM14.2516 1.10873C14.2516 0.610242 13.8475 0.206142 13.349 0.206143L5.22573 0.206142C4.72725 0.206142 4.32315 0.610242 4.32315 1.10873C4.32315 1.60721 4.72725 2.01131 5.22573 2.01131H12.4464V9.23197C12.4464 9.73045 12.8505 10.1346 13.349 10.1346C13.8475 10.1346 14.2516 9.73046 14.2516 9.23197L14.2516 1.10873ZM2.20463 13.5295L13.9872 1.74695L12.7108 0.470502L0.928184 12.2531L2.20463 13.5295Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-black text-normal2 mt-[12px]">
              <i>
                <span className="font-bold">By the way,&nbsp;</span> No
                obligations, no contracts, cancel at any time
              </i>
            </div>
          </div>
        </div>
      </div>

      {/* solutions */}
      <div id="Solutions" className="px-[30px] sm:px-[70px] border-t-1 border-black pt-[48px] items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
          <div
            className="rounded-[8px] border-primary-orange/50 border bg-gradient-to-r from-primary-orange/[0.09] to-primary-orange/[0.02] px-[20px] py-[20px] gap-[10px] flex flex-col items-center"
            style={{}}
          >
            <div className="text-[24px] font-medium max-w-[500px]">
              What if you never had to think about marketing again and still
              kept growing??
            </div>
            <div className="text-[20px] font-normal max-w-[500px] pl-[40px] text-black/90">
              No more wondering why&nbsp;
              <span className="text-primary-orange">
                it’s quiet on a Friday.
                <br />
                No more guessing&nbsp;
              </span>
              if what you’re doing is even working.
            </div>
          </div>

          <div className="rounded-[8px] border-primary/50 border bg-gradient-to-r from-primary/[0.09] to-primary/[0.02] px-[20px] py-[20px] gap-[10px] flex flex-col items-center">
            <div className="text-[24px] font-medium max-w-[500px]">
              Instead — your restaurant{" "}
              <span className="text-primary">grows on autopilot.</span>
            </div>
            <div className="text-[20px] font-normal max-w-[500px] pl-[40px] text-black/90">
              Get Ready for More orders. More reviews. No extra effort
              <br />
              And you finally will have room to think about what’s next — maybe
              another location, a franchise, or just taking Sundays off.
            </div>
          </div>
        </div>

        <div className="w-full items-center flex justify-center mt-[40px] mb-[56px]">
          <div className="max-w-[800px] text-center">
            <div className="text-[32px] mb-[24px] font-medium">
              <i>No Strategy, No System… Just Hoping for the Best?</i>
            </div>
            <div className="text-[22px] font-medium">
              <div className="mb-[12px]">
                Relying on Foot traffic and word of mouth for new customers???
              </div>
              <div>
                If "
                <span className="text-primary-orange">Hope They Come Back</span>
                " Is Your Strategy… It’s Time for an{" "}
                <span className="text-primary">Upgrade</span>. They wont keep
                coming back just because your food is good...people get busy and
                forget.
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Products */}
      <div id="Products" className="text-white w-full px-[20px] md:px-[70px] py-[70px] gap-[50px] flex flex-col bg-gradient-to-r from-[#090F0C] to-[#0A2012]">
        <div className="px-[20px] sm:px-[60px] py-[24px] grid-cols-1 grid md:grid-cols-2 text-center md:text-left rounded-[8px] border border-primary/50 bg-gradient-to-r from-primary/[0.09] to-primary/[0.02]">
          <div className="text-h5 md:text-[30px] xl:text-h4 font-bold md:font-medium text-white md:mb-0 mb-[20px] ">
            <i>
              Transform your restaurant in 90 days. <br />
              Start seeing more orders in just 7.
            </i>
          </div>
          <div className="text-normal2 md:text-normal1 font-normal pl-[20px] text-white/90">
            A full-stack, done-for-you growth engine, an infrastructure designed
            to help you get customers, and build a loyal customer base Using a
            stack built like a kitchen line — every piece working together to
            deliver one thing: a packed restaurant
          </div>
        </div>

        <div className="flex gap-[12px] md:pl-[50px] flex-col max-w-[1000px]">
          <div className="text-normal2 sm:text-h5 font-medium">
            Wondering How we're gonna do all that...?
          </div>
          <div className="font-bold text-[28px] sm:text-[32px] ">
            Presenting to you: The Table Turnerr Stack-
          </div>
          <div className="ml-[20px] text-[18px] sm:text-[20px] font-normal text-white/90">
            Designed to hammer every channel possible to get you amount of
            customers your supply chain and operations cant fullfill (a nice
            problem to have) Strategies to get new customers, Retain them and
            increase average order value
          </div>
        </div>

        <div>
          <div className="border border-white/25 border-l sm:border-l-0  flex flex-col sm:flex-row py-[10px] sm:py-0 items-center">
            <div className="flex flex-1 flex-col sm:pr-3 sm:px-0 px-4 gap-[20px] text-white">
              <div className="uppercase text-[#919191] text-normal4 ">
                Website
              </div>
              <div className="text-[24px] font-medium">
                High Converting Profit Boosting Website
              </div>
              <div className="text-normal2 font-normal text-white/90">
                - Search Engine Optimized Website <br />- Blog posting weekly to
                rank higher and getting to hungry customers
              </div>
              <div className="text-normal1 font-medium">
                ​Value <span className="text-primary">$2500</span>
              </div>
            </div>

            <div className="hidden sm:flex justify-end border-l border-white/25">
              <Image
                src={mock}
                alt="laptop"
                className="w-full h-full object-cover aspect-square"
              />
            </div>
          </div>

          {/* first */}

          <div className=" flex w-full items-start sm:flex-row flex-col">
            <div className="py-[30px] sm:min-w-[330px] md:flex md:flex-1 border-b sm:border-b-0 sm:border-r w-full border-white/25 ">
              <div className="flex flex-1 flex-col sm:pr-3 sm:px-0 px-4 gap-[20px] text-white">
                <div className="uppercase text-[#919191] text-normal4 ">
                  Social Media
                </div>
                <div className="text-[24px] font-medium">
                  Instagram Domination
                </div>
                <div className="text-normal2 font-normal">
                  - Automated Outbound strategies <br />
                  - Insta Profile Optimization <br />
                  - Influencer Marketing <br />
                  - Able to get you tons of new and repeat customers <br />
                </div>
                <div className="text-normal1 font-medium">
                  ​Value <span className="text-primary">$3000</span>
                </div>
              </div>
            </div>

            <div className="py-[30px] sm:py-0 h-full flex justify-end border-b sm:border-b-0 border-white/25 pl-3 my-auto">
              <div className="flex flex-1 flex-col sm:pr-3 sm:px-0 px-4 gap-[20px] text-white">
                <div className="uppercase text-[#919191] text-normal4 ">
                  System
                </div>
                <div className="text-[24px] font-medium">
                  Loyalty and Referral Programs
                </div>
                <div className="text-normal2 font-normal">
                  - Point based systems <br />
                  - Integrating with your epos system <br />
                  - Incentivizing customers to refer us to their friends and
                  family <br />
                </div>
                <div className="text-normal1 font-medium">
                  ​Value <span className="text-primary">$2500</span>
                </div>
              </div>
            </div>
          </div>

          {/* second */}

          <div className="flex w-full items-start sm:flex-row flex-col sm:border-t border-white/25 ">
            <div className="h-full my-auto py-[30px] sm:min-w-[300px] md:flex md:flex-1 border-b sm:border-b-0 border-white/25 w-full items-center">
              <div className="flex flex-1 flex-col sm:pr-3 sm:px-0 px-4 gap-[20px] text-white">
                <div className="uppercase text-[#919191] text-normal4 ">
                  Mobile App
                </div>
                <div className="text-[24px] font-medium">
                  Branded Restaurant App
                </div>
                <div className="text-normal2 font-normal text-white/90">
                  - Direct orders <br />
                  - Push notification marketing <br />
                  - One-tap reordering <br />
                  - Convenience for loyal customers <br />
                </div>
                <div className="text-normal1 font-medium">
                  ​Value <span className="text-primary">$3000</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end sm:border-l py-[30px] border-white/25 pl-3">
              <div className="flex flex-1 flex-col sm:pr-3 sm:px-0 px-4 gap-[20px] text-white">
                <div className="uppercase text-[#919191] text-normal4 ">
                  System
                </div>
                <div className="text-[24px] font-medium">
                  Smart Email and Push notifications Marketing
                </div>
                <div className="text-normal2 font-normal text-white/90">
                  Smart Campaigns that bring customers back and make them spend
                  more. <br className="hidden lg:block" /> Building great google
                  ratings, asking for review after they've tasted our food.
                </div>
                <div className="text-normal1 font-medium">
                  ​Value <span className="text-primary">$2000</span>
                </div>
                <div className="text-normal2 font-normal text-white/90">
                  If order exceeds $xx, we give free delivery, or we give free
                  ”low cost item”-other similar strategies.
                </div>
                <div className="text-normal1 font-medium">
                  ​Value <span className="text-primary">$750</span>
                </div>
              </div>
            </div>
          </div>
          {/* third */}
          <div className="text-white w-full px-[20px] md:px-[70px] py-[24px] flex border border-primary/50 bg-gradient-to-r from-primary/[0.09] to-primary/[0.02]">
            <div className="flex sm:flex-row flex-col gap-[30px] max-w-[950px] mx-auto items-center">
              <div className="text-[26px] sm:text-[30px] text-center sm:text-right sm:min-w-[160px]">
                <i>
                  Total Values worth{" "}
                  <span className="text-primary inline text-nowrap">
                    $12,250 +
                  </span>
                </i>
              </div>
              <div className="text-normal2 sm:text-normal1 font-normal text-white/80">
                it has the potential to make you $50,000+ the first year, if
                your food is good and if youre able to keep up with the demand.
                This is why we only work with restaurants who sell exceptional
                food(because its easier to sell lol)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRICE */}
      <div id="Price" className="min-h-screen flex items-center">
        <div className="min-h-screen lg:max-h-[820px] w-screen px-[20px] sm:px-[60px] pt-[20px] sm:pt-[40px] md:pt-[70px] pb-[32px] flex items-center">
          <div className="flex flex-col items-center justify-between h-full w-full">
            <div
              className="text-black w-full font-creto-black text-[40px] sm:text-[50px] md:text-[60px] lg:text-[70px] xl:text-hero text-left font-black leading-[1.1] mb-2"
              style={{
                letterSpacing: "-1px",
                textTransform: "uppercase",
              }}
            >
              So what’s the price of <br />
              <div className="flex-row flex w-full justify-start">
                <div className="text-nowrap">ALLLL THIS??</div>
                <div className="flex-1 justify-center lg:flex hidden">
                  <div
                    className=" text-normal2 font-medium font-creto normal-case my-auto flex-col max-w-[550px] pl-4"
                    style={{
                      letterSpacing: "0px",
                    }}
                  >
                    <span className="text-normal1 font-semibold">
                      {" "}
                      Only <span className="text-primary">
                        {" "}
                        $525 per month
                      </span>{" "}
                      for the first 2 months{" "}
                    </span>{" "}
                    after the free months over.....after that we re-adjust
                    prices based of the results
                  </div>
                </div>
              </div>
              <p className="text-primary">Free for 23 days</p>
            </div>

            <div className="max-w-[900px] text-normal3 sm:text-normal2 md:text-normal1 flex flex-col sm:flex-row justify-center items-center text-center gap-[20px] text-black/90">
              <div className="text-center md:text-right text-[28px] max-w-[200px] font-semibold">
                <i>
                  We have to <span className="text-primary">earn</span> your
                  business every 
                  <span className="text-primary-orange">month</span>.
                </i>
              </div>
              <div className="text-center sm:block sm:text-start text-black/90 text-normal1">
                Keep in mind, we will make you shit ton of money in the long run
                and we will ask for obviously more than just 525, fair enough
                right?
                <br />
                We select only 4 restaurants every month, and give them all our
                attention.
              </div>
            </div>

            <div className="text-[20px] sm:text-[28px] md:text-[32px] font-semibold text-black w-full text-center mt-[35px]">
              <i>
                Feel the <span className="text-primary">Results</span>, Before
                you Feel the <span className="text-primary-orange">Cost</span>.
              </i>
            </div>

            <div className="flex flex-col just sm:flex-row gap-[10px] mt-[10px] sm:mt-[32px]">
              <div className="flex py-[5px] pl-[21px] pr-[5px] items-center justify-between gap-[10px] rounded-[9px] bg-primary group">
                <div className="font-bold text-normal1 text-white">
                  Book a Free Demo{" "}
                  <span className="hidden sm:inline-block">Already</span>
                </div>
                <div className="flex h-[34px] w-[34px] p-[11] justify-center items-center gap-[13px] rounded-[8px] bg-black overflow-hidden border-black border-2">
                  <div className="group-hover:scale-250 group-hover:translate-x-[-40%] group-hover:translate-y-[40%] transition-all duration-500 overflow-hidden">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="14"
                      viewBox="0 0 15 14"
                      fill="none"
                    >
                      <path
                        d="M0.928184 12.2531C0.575703 12.6056 0.575703 13.177 0.928184 13.5295C1.28066 13.882 1.85215 13.882 2.20463 13.5295L0.928184 12.2531ZM14.2516 1.10873C14.2516 0.610242 13.8475 0.206142 13.349 0.206143L5.22573 0.206142C4.72725 0.206142 4.32315 0.610242 4.32315 1.10873C4.32315 1.60721 4.72725 2.01131 5.22573 2.01131H12.4464V9.23197C12.4464 9.73045 12.8505 10.1346 13.349 10.1346C13.8475 10.1346 14.2516 9.73046 14.2516 9.23197L14.2516 1.10873ZM2.20463 13.5295L13.9872 1.74695L12.7108 0.470502L0.928184 12.2531L2.20463 13.5295Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-black text-normal2 mt-[12px]">
              <i>
                <span className="font-bold">By the way,&nbsp;</span> No
                obligations, no contracts, cancel at any time
              </i>
            </div>
          </div>
        </div>
      </div>

      {/* reviews */}
      <div id="Reviews" className="w-full md:px-[70px] px-[20px] pt-[48px] flex flex-col gap-[40px] border-0 border-t border-black">
        <div className="w-full items-center flex justify-center text-black font-semibold text-[30px]">
          <i>What Other Restaurants think</i>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[1200px] mx-auto gap-[10px]">
          <Review_card
            name="Danish - Grill Shack"
            text="Amazing work amazing people!! Definitely my go to 🌊🔥"
            id="1"
            position={["top-0 left-0", "bottom-0 right-0"]}
            className="h-[154px]"
          />

          <Review_card
            name="Miss Mat Cafe"
            text="🙌🙌 amazing team"
            id="2"
            position={["bottom-0 left-0", "top-0 right-0"]}
            className="h-[113px]"
          />

          <Review_card
            name="Texbbq"
            text="Great communication and work from the team"
            id="3"
            position={["bottom-0 left-0", "top-0 right-0"]}
            className="h-[164px] lg:flex hidden"
          />

          <Review_card
            name="Churros el bochito"
            text="Great communication and work from the team"
            id="4"
            position={["bottom-0 left-0", "top-0 right-0"]}
            className="h-[164px] lg:translate-y-[-10px]"
          />

          <Review_card
            name="Qadeer Coffee"
            text="Very professional team!! 🙌🏽🙌🏽🩵🩵 great working with you"
            id="5"
            position={["top-0 left-0", "bottom-0 right-0"]}
            className="h-[164px] sm:translate-y-[-45px] lg:translate-y-[-55px]"
          />
        </div>
      </div>

      <div 
        id="Contact"
        className="relative mt-[70px] bg-gradient-to-r from-[#090F0C] to-[#0A2012]"
      >
          <MovingGradientBackground/>

        <div 
          ref={sectionRef}
          className="h-screen flex items-center justify-center z-10 snap-start px-[20px]"
        >
          <div className="max-w-[500px] z-20">
              <div className="gap-[22px] flex flex-col items-center justify-center text-center">
                <div className="text-[32px] font-semibold italic text-white">
                We only on select 3 restaurants to work with every month.
                </div>
                <div className="text-normal1 font-medium text-white/60 italic mt-2">
                Book the free demo call to see if you qualify.
                </div>
                <div>
                  <ThemeButton
                    text="Book a Free Demo"
                    className="w-[220px]"
                    textClassName="group-hover:translate-x-5"
                  />
                </div>
              </div>
          </div>
        </div>
        
        <div className="h-[1px] bg-white/25 w-[70%] mx-auto"/>

        <div className="">
          <Footer onclick = {scrollToSection}/>
        </div>
      </div>
    </div>
  );
}


