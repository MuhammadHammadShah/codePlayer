import { forwardRef, useCallback, useEffect, useRef } from "react";
import { Player, useTime } from "liqvid";
import { playback } from "./markers";
import * as ReactDOM from "react-dom";

function Driving() {
  const tripDuration = 10000;
  const circleRef = useRef<SVGCircleElement>(null);
  const path = useRef<SVGPathElement>(null);
  const length = useRef(0);

  useEffect(() => {
    length.current = path.current.getTotalLength();
  }, []);

  const placeCircle = useCallback((t: number) => {
    const pt = path.current.getPointAtLength(
      (length.current * t) / tripDuration
    );

    // Move circle to current point
    circleRef.current.setAttribute("cx", pt.x);
    circleRef.current.setAttribute("cy", pt.y);
  }, []);

  useTime(placeCircle, []);

  return (
    <svg id="driving" viewBox="-15 -11 169.3954 135.29021">
      <Path id="road" />
      <Path id="lines" ref={path} />

      {/* Testing element — blue circle "car" */}
      <circle ref={circleRef} r="5" fill="blue" />
    </svg>
  );
}

const Path = forwardRef((props, ref) => (
  <path
    {...props}
    ref={ref}
    d="M 15.1515 0.621968 C 6.35576 21.2005 3.59978 44.1321 1.71613 66.265 C 1.43508 69.5674 1.5186 81.4964 2.84747 85.1207 C 4.64739 90.0295 7.42703 94.5295 10.0126 99.0739 C 11.5816 101.831 12.7975 105.033 15.2922 106.993 C 25.119 114.714 33.5883 117.101 45.4613 118.684 C 46.3684 118.805 47.2826 118.339 48.1011 117.93 C 52.5787 115.691 57.0514 113.412 61.3001 110.764 C 65.74 107.997 70.0251 104.967 74.1219 101.714 C 83.3902 94.3536 94.7774 85.2847 94.1089 71.9217 C 93.9686 69.1169 93.8973 66.1238 92.6005 63.6328 C 90.8377 60.2467 87.7306 57.7518 85.2305 54.867 C 80.5699 49.489 75.9441 43.4649 69.8706 39.4561 C 63.6763 35.3677 55.2868 36.9418 48.6407 38.3973 C 37.925 40.744 36.2688 41.6217 27.9814 47.4236 C 25.3264 49.2823 21.6316 53.3863 21.2908 56.7008 C 21.1044 58.5138 21.3701 60.3477 21.2908 62.1685 C 21.1592 65.1905 20.0191 65.3026 22.3964 67.4621 C 26.2155 70.9313 30.963 72.3008 36.0075 72.3008 C 37.1154 72.3008 38.2891 72.6771 39.3312 72.3008 C 40.6524 71.8238 41.6532 70.7168 42.7668 69.8605 C 47.7042 66.0641 49.3372 61.2464 52.0471 55.6444 C 52.4143 54.8853 52.9739 54.1997 53.1785 53.3817 C 55.6341 43.5591 53.9219 33.1242 53.9219 23.1066 C 53.9219 20.454 53.3339 12.8842 55.0532 9.75964 C 56.2372 7.6079 58.1588 5.94924 59.8349 4.1541 C 60.2638 3.6947 60.7307 3.16326 61.3433 3.02276 C 69.6809 1.11052 80.6872 1.51294 89.0201 3.37549 C 91.6777 3.96951 95.9544 4.48142 98.2689 6.36031 C 99.846 7.64057 101.155 9.27307 102.208 11.0097 C 105.205 15.9492 105.955 18.9477 106.685 24.3699 C 107.25 28.5702 107.145 41.2585 109.28 44.527 C 110.419 46.2714 111.918 47.7545 113.309 49.305 C 114.104 50.1909 114.851 51.1592 115.834 51.8301 C 124.356 57.645 129.239 54.5354 134.708 47.1503 C 135.751 45.7423 136.212 43.7681 137.385 42.4902"
  />
));

function MyVideo() {
  return (
    <Player playback={playback}>
      <Driving />
    </Player>
  );
}

ReactDOM.createRoot(document.querySelector("main")).render(<MyVideo />);
