import React, {useEffect, useState} from 'react';
import { HStack, Box, Card, Text, CardBody, SimpleGrid, GridItem, VStack, Input } from '@chakra-ui/react'
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";
import "./editor.css";


function Editor(props) {
    const initBrush = [{
        "name": "brush 1",
        "string": `// this is where you can code your own brushes
        p.stroke(Math.random()*250, Math.random()*250, 0, 255);
        p.strokeWeight(12);
        p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);`}];
    
    const [brushes, setBrushes] = useState(initBrush);
    const [selectedBrush, setSelectedBrush] = useState(initBrush[0]);
    const [selectedBrushName, setName] = useState(selectedBrush.name);

    function createNewBrush() {
        var newBrushes = brushes.concat([{"name": "brush " + (brushes.length+1), "string": initBrush.string}]);
        setBrushes(newBrushes); 
    }

    const brushComps = brushes.map((element, index) => {
        return(
        <GridItem key={index}>
            <Card className={"box"}>
                <CardBody onClick={()=>{setSelectedBrush(element); props.setCode(brushes[index].string); setName(element.name)}} textAlign={"center"}>
                    <Text>{element.name}</Text>
                </CardBody>
            </Card>
        </GridItem>
        );
    });

    function changeBrushName (event) {
        const value = event.target.value
        // change values for the brushes register.
        var index = brushes.findIndex((element) => (element.string === selectedBrush.string));
        brushes[index].name = value;
        setSelectedBrush(brushes[index]);
        setBrushes(brushes);
        // set dynamic name on screen.
        setName(value);
    }

    function setBrushCode (code) {
        // change values for the brushes register.
        var index = brushes.findIndex((element) => (element.string === selectedBrush.string));
        brushes[index].string = code;
        setSelectedBrush(brushes[index]);
        setBrushes(brushes);
        // set dynamic name on screen.
        props.setCode(code);
    }

    useEffect(() => {
    }, [brushes, selectedBrush, selectedBrushName]);


    return (
    <Box width={"100vw"}>
        <HStack>
            <VStack align={"flex-start"}>
                <Input value={selectedBrushName} onChange={(event) => {changeBrushName(event)}} variant={"unstyled"} marginLeft={"2.5vw"} lineHeight={0.5} color={"blackAlpha.500"} fontFamily={"Helvetica"} fontSize={"24"} fontWeight={"bold"}>
                </Input>
                <AceEditor
                mode="javascript"
                theme="tomorrow"
                name="blah2"
                width='50vw'
                onChange={(code)=> {props.brushToCanvas(code); setBrushCode(code)}}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={props.code}
                setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
                }}/>
            </VStack>
            <Box paddingLeft={"4vw"} alignSelf={'start'} width="45vw">
                <SimpleGrid minChildWidth='120px' spacing='12px'>
                        <Card onClick={createNewBrush}>
                            <CardBody textAlign={"center"}>
                                <Text>+</Text>
                            </CardBody>
                        </Card>
                        {brushComps}
                 </SimpleGrid>
            </Box>
        </HStack>
    </Box>
    )
  }

  export default Editor