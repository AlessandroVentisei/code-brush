import React from 'react';
import { useEffect, useRef } from 'react';
import p5 from 'p5';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another

function App() {
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );
  const [output, setOutput] = React.useState(`function add(a, b) {\n  return a + b;\n}`);
      // create a reference to the container in which the p5 instance should place the canvas
      const p5ContainerRef = useRef();

      useEffect(() => {
          // On component creation, instantiate a p5 object with the sketch and container reference 
          const p5Instance = new p5(sketch, p5ContainerRef.current);
  
          // On component destruction, delete the p5 instance
          return () => {
              p5Instance.remove();
          }
      }, []);
  return (
    <body>
      <Editor
        value={code}
        onValueChange={code => setCode(code)}
        highlight={code => highlight(code, languages.js)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
      <button onClick={()=>{userDefinedBrush(code)}}>Run</button>
      <p>{output}</p>
      <div className="App" ref={p5ContainerRef} />
      </body>
  );
  function sketch(p) {
    // p is a reference to the p5 instance this sketch is attached to
    p.setup = function() {
        p.createCanvas(400, 400);
        p.background(256);
    }
    p.draw = function() {
      if (p.mouseIsPressed) {
        this.pen();
      }
    }
    p.pen = function() {
      p.stroke(0, 0, 0, 255);
      p.strokeWeight(2);
      p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
    }
}
  function userDefinedBrush(code) {
    // eslint-disable-next-line no-new-func
    const F = new Function(code);
    const output = F();
    setOutput(output);
  }
}

export default App;
