import { Playback, Player } from "liqvid";
import { easings } from "@liqvid/utils/animation";
import { combineRefs } from "@liqvid/utils/react";
import * as ReactDOM from "react-dom";

import { playback } from "./markers";

/* animations */
const fall = (delay: number, duration: number) =>
  playback.newAnimation(
    [
      { top: "0%", transform: "rotate(0deg)" },
      { top: "55%", transform: "rotate(360deg)" },
    ],
    {
      delay,
      duration,
      easing: `cubic-bezier(${easings.easeOutSine})`,
      fill: "both",
    }
  );

const fadeIn = (delay: number, duration: number) =>
  playback.newAnimation([{ opacity: 0 }, { opacity: 1 }], {
    delay,
    duration,
    easing: "ease-in-out",
    fill: "both",
  });

const scale = (delay: number, duration: number) =>
  playback.newAnimation(
    [{ transform: "scale(1)" }, { transform: "scale(3)" }],
    { delay, duration, easing: "ease-in-out", fill: "both" }
  );

function MyVideo() {
  return (
    <Player playback={playback}>
      <div className="box blue" ref={fall(0, 800)} />
      <div className="box green" ref={fall(200, 800)} />
      <div className="box purple" ref={fall(400, 800)} />
      <h1 ref={combineRefs(fadeIn(2000, 700), scale(2000, 700))}>Oh yeah</h1>
      <h1 ref={combineRefs(fadeIn(2800, 700), scale(2800, 700))}>Code Bite</h1>
    </Player>
  );
}
ReactDOM.createRoot(document.querySelector("main")).render(<MyVideo />);
