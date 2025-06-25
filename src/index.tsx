import { Player, Script } from "liqvid";
import * as ReactDOM from "react-dom";

const markers = [
  ["intro/", "0:01.5"],
  ["intro/world", "0:01.5"],
  ["plan/", "0:01"],
  ["plan/1", "0:01"],
  ["plan/2", "0:01"],
  ["plan/3", "0:01"],
];

const script = new Script(markers);

function MyVideo() {
  return (
    <Player script={script}>
      <Intro />
      <Plan />
    </Player>
  );
}

function Intro() {
  return (
    <section data-during="intro/">
      <h1>
        This is for the <span data-from-first="intro/world">Dawood Bhai!</span>
      </h1>
    </section>
  );
}

function Plan() {
  return (
    <section data-during="plan/">
      <h2>The Great CodeBite</h2>
      <ol>
        <li data-from-first="plan/1">Where we make interactive videos</li>
        <li data-from-first="plan/2">Just for our</li>
        <li data-from-first="plan/3">Great Students</li>
      </ol>
    </section>
  );
}

ReactDOM.createRoot(document.querySelector("main")).render(<MyVideo />);
