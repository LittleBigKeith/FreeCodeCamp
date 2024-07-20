import "./App.css";
import { useState, useEffect } from "react";
import { AppBar, Box, Typography } from "@mui/material";
import { marked } from "marked";

marked.use({
  breaks: true,
});

const App = () => {
  const placeholder = `# Welcome to my React Markdown Previewer!

  ## This is a sub-heading...
  ### And here's some other cool stuff:
  
  Heres some code, \`<div></div>\`, between 2 backticks.
  
  \`\`\`
  // this is multi-line code:
  
  function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
      return multiLineCode;
    }
  }
  \`\`\`
  
  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  And feel free to go crazy ~~crossing stuff out~~.
  
  There's also [links](https://www.freecodecamp.org), and
  > Block Quotes!
  
  And if you want to get really crazy, even tables:
  
  Wild Header | Crazy Header | Another Header?
  ------------ | ------------- | -------------
  Your content can | be here, and it | can be here....
  And here. | Okay. | I think we get it.
  
  - And of course there are lists.
    - Some are bulleted.
       - With different indentation levels.
          - That look like this.
  
  
  1. And there are numbered lists too.
  1. Use just 1s if you want!
  1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`;

  const [htmlContent, setHtmlContent] = useState("");
  const translate = (text) => {
    setHtmlContent(marked.parse(text));
  };

  useEffect(() => translate(placeholder), []);

  return (
    <Box className="App" xs={{ width: "100%" }}>
      <header className="App-header">
        <AppBar>Markdown Previewer</AppBar>
      </header>
      <Box id="window">
        <Box id="edit-label">
          <Typography variant="h5">Editor</Typography>
        </Box>
        <textarea
          id="editor"
          onChange={(event) => translate(event.target.value)}
          style={{
            width: "calc(100vw - 4rem)",
            minWidth: "calc(100px + 4rem)",
            minHeight: "calc(50vh - 4rem - 64px)",
            margin: "1rem",
            padding: "1rem",
            resize: "both",
            backgroundColor: "#ffffff55",
            borderRadius: "10px",
          }}
        >
          {placeholder}
        </textarea>
        <Box id="preview-label">
          <Typography variant="h5">Previewer</Typography>
        </Box>
        <Box
          id="preview"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        ></Box>
      </Box>
    </Box>
  );
};

export default App;
