import {Playback, Player, usePlayer} from "liqvid";
import {useEffect} from "react";
import * as ReactDOM from "react-dom";

import {playback } from "./markers"

function MyVideo() {
  return (
    <Player playback={playback}>
      <div id="div1">
        This div will pause/play the video if clicked
        <br/>
        <br/>
        <a href="https://google.com" target="_blank">This won't though</a>
        <button>Me neither</button>
      </div>
      <div id="div2" data-affords="click">
        This div won't
      </div>
      {/* Enabling this will disable pause-on-click globally */}
      {false && <DisablePause/>}
    </Player>
  );
}

/** Disable pause-on-click. */
function DisablePause() {
  // since this calls usePlayer(), cannot put directly in <MyVideo>
  const player = usePlayer();
  useEffect(() => {
    player.hub.on("canvasClick", () => false);
  }, []);
  return null;
}

ReactDOM.createRoot(document.querySelector("main")).render(<MyVideo />);