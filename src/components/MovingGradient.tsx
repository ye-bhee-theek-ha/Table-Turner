"use client";

import { JSX, useEffect, useRef } from 'react';

// Easing function for smoother transitions (cubic ease-in-out)
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export default function MovingGradientBackground(): JSX.Element {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const animationFrameId = useRef<number | null>(null); // Store animation frame ID

    const shapes = [
    "M-128 -109 C 188 132 303 305 662 305 C 992 305 1413 487 1585 802 L 1567 859 C 1366 622 1164 492 701 451 C 153 402 159 199 -145 -54 L -128 -109 Z",
    "M-100 -150 C 200 100 350 250 700 280 C 1000 300 1400 450 1550 750 L 1530 820 C 1350 600 1150 450 700 420 C 200 380 150 150 -120 -100 L -100 -150 Z",
    "M-150 -120 C 150 150 320 320 650 320 C 980 320 1430 500 1600 780 L 1580 850 C 1380 600 1180 480 700 440 C 180 400 130 180 -160 -60 L -150 -120 Z",
    "M-200 -200 C 150 100 400 350 700 350 C 1050 350 1450 550 1650 850 L 1630 900 C 1400 650 1200 500 720 470 C 150 420 100 150 -180 -150 L -200 -200 Z",
    ];

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const gradientPath = svg.querySelector('path');
    if (!gradientPath) return;

    // Animation variables
    let currentShapeIndex = 0;
    let nextShapeIndex = 1;
    let offsetX = 0;
    let offsetY = 0;
    let directionX = 1;
    let directionY = 1;
    let morphProgress = 0;

    // --- Adjust these values for desired speed ---
    const morphSpeed = 0.005; // Slower morphing
    const moveSpeed = 0.08;  // Slower movement
    const bounds = 25;        // Reduced movement range slightly
    // -------------------------------------------

    // Path parser - Extracts command letters and coordinates from SVG path
    const parsePath = (pathString: string): { command: string; coords: number[] }[] | null => {
        const regex = /([A-Za-z])|(-?\d+(\.\d+)?)/g;
        const tokens = pathString.match(regex);
        if (!tokens) return null; // Handle potential null match

        const result: { command: string; coords: number[] }[] = [];
        let currentCommand = '';
        let currentCoords: number[] = [];

        for (const token of tokens) {
            if (/[A-Za-z]/.test(token)) {
                if (currentCommand && currentCoords.length > 0) {
                    result.push({ command: currentCommand, coords: [...currentCoords] });
                }
                currentCommand = token;
                currentCoords = []; // Reset coords for the new command
            } else {
                const num = parseFloat(token);
                if (!isNaN(num)) { // Ensure it's a valid number
                    currentCoords.push(num);
                }
            }
        }

        // Add the last command
        if (currentCommand && currentCoords.length > 0) {
            result.push({ command: currentCommand, coords: [...currentCoords] });
        }

        return result;
    };

    // Interpolate between two paths based on progress (0 to 1)
    const interpolatePaths = (path1Str: string, path2Str: string, progress: number): string => {
        const parsedPath1 = parsePath(path1Str);
        const parsedPath2 = parsePath(path2Str);

        // **Crucial Check:** Ensure paths are valid and compatible
        if (!parsedPath1 || !parsedPath2 || parsedPath1.length !== parsedPath2.length) {
          console.warn("SVG paths are not compatible for morphing. Ensure they have the same structure.");
          // Fallback: Return the path corresponding to the *start* of the current transition
          return path1Str;
        }

        let result = '';
        for (let i = 0; i < parsedPath1.length; i++) {
            const segment1 = parsedPath1[i];
            const segment2 = parsedPath2[i];

            // **Crucial Check:** Ensure segments match
            if (segment1.command !== segment2.command || segment1.coords.length !== segment2.coords.length) {
              console.warn(`SVG path segment ${i} mismatch ('${segment1.command}' vs '${segment2.command}' or coord length). Morphing may jump.`);
              // Fallback: Return the path corresponding to the *start* of the current transition
              return path1Str;
            }

            result += segment1.command;

            for (let j = 0; j < segment1.coords.length; j++) {
                const coord1 = segment1.coords[j];
                const coord2 = segment2.coords[j];
                // Linear interpolation: start + (end - start) * progress
                const interpolatedValue = coord1 + (coord2 - coord1) * progress;
                result += (j === 0 ? '' : ' ') + interpolatedValue.toFixed(3); // Add space separator for coords > 0
            }
        }
        return result;
    };


    // Animation function using requestAnimationFrame
    const animate = () => {
        // 1. Update Movement
        offsetX += moveSpeed * directionX;
        offsetY += moveSpeed * directionY;

        // Bounce logic
        if (Math.abs(offsetX) > bounds) {
          offsetX = bounds * directionX; // Clamp to bounds
          directionX *= -1;
        }
        if (Math.abs(offsetY) > bounds) {
          offsetY = bounds * directionY; // Clamp to bounds
          directionY *= -1;
        }

        // 2. Update Morphing
        morphProgress += morphSpeed;
        if (morphProgress >= 1) {
            morphProgress = 0; // Reset progress
            currentShapeIndex = nextShapeIndex;
            nextShapeIndex = (nextShapeIndex + 1) % shapes.length;
        }

        // Get current and next shapes for interpolation
        const currentShape = shapes[currentShapeIndex];
        const nextShape = shapes[nextShapeIndex];

        // Apply easing to the progress for smoother transition
        const easedProgress = easeInOutCubic(morphProgress);

        // Interpolate the path data
        const interpolatedPath = interpolatePaths(currentShape, nextShape, easedProgress);

        // 3. Update SVG Path attributes
        // Avoid setting 'd' if it hasn't changed (minimal optimization)
        if (gradientPath.getAttribute('d') !== interpolatedPath) {
             gradientPath.setAttribute('d', interpolatedPath);
        }
        // Use CSS transform for potentially better performance
        gradientPath.style.transform = `translate(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px)`;

        // Request next frame
        animationFrameId.current = requestAnimationFrame(animate);
    };

    // Start animation
    // Clear any previous animation frame before starting a new one
    if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
    }
    animationFrameId.current = requestAnimationFrame(animate);

    // Cleanup function to cancel animation when component unmounts
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="gradient-container absolute inset-0 overflow-hidden z-0 pointer-events-none"> {/* Added pointer-events-none */}
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 1440 1010"
        fill="none"
        preserveAspectRatio="xMidYMid slice" // Cover the container
      >
        {/* The filter can be performance intensive. If needed, you could reduce stdDeviation or remove it */}
        <defs>
           {/* Note: Filter coordinates (x, y, width, height) might need adjustment if path moves significantly outside original bounds */}
          <filter id="filter0_f_1013_372" x="-350" y="-300" width="2150" height="1400" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            {/* Reduced blur slightly, adjust if needed */}
            <feGaussianBlur stdDeviation="70" result="effect1_foregroundBlur_1013_372"/>
          </filter>
          <radialGradient id="paint0_radial_1013_372" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(72.9785 212.888) rotate(107.062) scale(0.0594206 500.411)">
            <stop stopColor="#D2FF00"/>
            <stop offset="1" stopColor="#34A853"/>
          </radialGradient>
        </defs>
         {/* Apply filter and fill to the group containing the path */}
        <g filter="url(#filter0_f_1013_372)">
          {/* Initial path data - will be overwritten by JS */}
          <path
             d={shapes[0]} // Start with the first shape
             fill="url(#paint0_radial_1013_372)"
             fillOpacity="0.5"
          />
        </g>
      </svg>
    </div>
  );
}