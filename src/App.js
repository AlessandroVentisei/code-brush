import React, { useState, useCallback } from 'react';
import { useEffect, useRef } from 'react';
import Sketch from 'react-p5';
import Editor from "./components/editor"
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";
import { ChakraProvider, VStack, Box, Flex } from '@chakra-ui/react'
import './App.css';

function App() {
  const [editorView, setEditorView] = useState("show");
  let containerRef = useRef();
  const handleKeyPress = useCallback((event) => {
    if(event.ctrlKey === true) {
      console.log(`Key pressed: ${event.key}`);
      if (event.key === "e"){
      if(editorView === "show") {
        setEditorView("hide")
        console.log("inactive");
      } else {
        setEditorView("show")
        console.log("active");
      }
    }
    }
  }, [editorView]);
  const [code, setCode] = React.useState(`// this is where you can code your own brushes
p.stroke(Math.random()*250, Math.random()*250, 0, 255);
p.strokeWeight(12);
p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY); `
  );
  const [brush, setBrush] = useState(code);
  // set initial p5 instance
  const brushToCanvas = (code) => {
    // hand the code to the canvas here.
    // any checking for malware could happen here.
    setBrush(code.toString() );
  };
  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress);
    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress, editorView]);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef)
    p5.background(200);
}
  const draw = p5 => {
    if (p5.mouseIsPressed) {
      pen(p5);
    }
  }
  const pen = function(p) {
    // eslint-disable-next-line no-new-func, no-eval
    eval(brush);
  }


  return (
    <ChakraProvider>
      <Box width={"100vw"} height={"100vh"} overflowY="hidden">
        <VStack>
          <Sketch setup={setup} draw={draw} containerRef={containerRef} brush={brush}/>
          <div id='codeEditor' className={editorView}>
            <Editor code={code} brushToCanvas={brushToCanvas} setCode={setCode}/>
              </div>
            </VStack>
          </Box>
        </ChakraProvider>
  );
}

/*
    useEffect(
      () => {
        let inst = p5(sketch, props.containerRef.current)
        // Cleanup function! Without this the new p5.js sketches in new box
        return () => inst.remove();
      },
      // Let React know that this effect needs re-rendering when the brush prop changes
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [props]
    );
  
    return (
      <Flex>
        <div ref={props.containerRef}/>
      </Flex>
    );
}
    */
export default App;
