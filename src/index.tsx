import { Player, Utils, usePlayer } from "liqvid";
import { useMemo, useRef } from "react";
import * as ReactDOM from "react-dom";
import { playback } from "./markers";
const { dragHelperReact } = Utils.interactivity,
  { clamp } = Utils.misc;

function Pig() {
  const player = usePlayer();

  const ref = useRef<HTMLImageElement>();
  const offset = useRef({ x: 0, y: 0 });
  const dragEvents = useMemo(
    () =>
      dragHelperReact<HTMLImageElement>(
        // move
        (e, hit) => {
          // prevent from dragging off the page
          const left =
            clamp(
              0,
              hit.x - offset.current.x - player.canvas.offsetLeft,
              player.canvas.offsetWidth - ref.current.offsetWidth
            ) / player.canvas.offsetWidth;

          const top =
            clamp(
              0,
              hit.y - offset.current.y - player.canvas.offsetTop,
              player.canvas.offsetHeight - ref.current.offsetHeight
            ) / player.canvas.offsetHeight;

          Object.assign(ref.current.style, {
            left: `${left * 100}%`,
            top: `${top * 100}%`,
          });
        },
        // down
        (e, hit) => {
          e.preventDefault();
          const dims = ref.current.getBoundingClientRect();
          offset.current.x = hit.x - dims.left;
          offset.current.y = hit.y - dims.top;

          document.body.classList.add("dragging");
        },
        // up
        () => {
          document.body.classList.remove("dragging");
        }
      ),
    []
  );

  return (
    <img
      alt="A flying jet"
      className="draggable"
      id="jet"
      src="/img/jet.svg"
      ref={ref}
      {...dragEvents}
    />
  );
}

ReactDOM.render(
  <Player playback={playback}>
    <Pig />
  </Player>,
  document.querySelector("main")
);
