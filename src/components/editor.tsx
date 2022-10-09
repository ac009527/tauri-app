import React, { memo } from "react";
import CodeMirrorComponent from "@uiw/react-codemirror";
import CodeMirror from "codeMirror";
import 'codemirror/addon/comment/comment'
import 'codemirror/addon/selection/mark-selection'

CodeMirror.defineMode("hosts", function () {
  function tokenBase(stream: CodeMirror.StringStream) {
    if (stream.eatSpace()) return null;

    let sol = stream.sol();
    let ch = stream.next();

    let s = stream.string;

    if (ch === "#") {
      stream.skipToEnd();
      return "comment";
    }
    if (!s.match(/^\s*([\d.]+|[\da-f:.%lo]+)\s+\w/i)) {
      return "error";
    }

    if (sol && ch && ch.match(/[\w.:%]/)) {
      stream.eatWhile(/[\w.:%]/);
      return "ip";
    }

    return null;
  }

  function tokenize(stream: CodeMirror.StringStream, state: any) {
    return (state.tokens[0] || tokenBase)(stream, state);
  }

  return {
    startState: function () {
      return { tokens: [] };
    },
    token: function (stream, state) {
      console.log(tokenize(stream, state));
      return tokenize(stream, state);
    },
    lineComment: "#",
  };
});

//CodeMirror.defineMIME('text/x-hosts', 'hosts');
function App() {
  // const onChange = React.useCallback((value, viewUpdate) => {
  //   console.log("value:", value);
  // }, []);
  return (
    <CodeMirrorComponent
      value={`
      151.101.1.6                  github.map.fastly.net
      151.101.1.6                  github.global.ssl.fastly.net`}
      height="200px"
      options={{ mode: "hosts" }}
      //   extensions={[javascript({ jsx: true })]}
      // onChange={onChange}
    />
  );
}
export default memo(App);
