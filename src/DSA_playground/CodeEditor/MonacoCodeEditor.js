import React from 'react';
import Editor from '@monaco-editor/react';

const MonacoCodeEditor = ({ 
  value, 
  onChange, 
  language = 'java',
  theme = 'vs-dark',
  onSubmit 
}) => {
  const handleEditorDidMount = (editor, monaco) => {
    // Disable copy paste commands
    // editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyC, () => {
    //   // Prevent copy
    //   return null;
    // });
    
    // editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, () => {
    //   // Prevent paste
    //   return null;
    // });
    
    // editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyX, () => {
    //   // Prevent cut
    //   return null;
    // });

    // Configure editor settings
    editor.updateOptions({
      fontSize: 14,
      fontFamily: "'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
      minimap: { enabled: false },
      lineNumbers: 'on',
      renderLineHighlight: 'all',
      matchBrackets: 'always',
      autoClosingBrackets: 'always',
      autoClosingQuotes: 'always',
      tabSize: 4,
      detectIndentation: true,
      formatOnPaste: true,
      formatOnType: true,
      scrollBeyondLastLine: false,
      automaticLayout: true,
      contextmenu: false  // Disable context menu to prevent right-click copy/paste
    });

    // Add Ctrl/Cmd + Enter shortcut
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      () => {
        if (onSubmit) {
          onSubmit();
        }
      }
    );

    // Override the default copy/paste/cut handlers
    // editor.onKeyDown((e) => {
    //   if (
    //     (e.ctrlKey || e.metaKey) && 
    //     (e.code === 'KeyC' || e.code === 'KeyV' || e.code === 'KeyX')
    //   ) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //   }
    // });
  };

  return (
    <Editor
      height="100%"
      width="100%"
      language={language}
      theme={theme}
      value={value}
      onChange={onChange}
      onMount={handleEditorDidMount}
      options={{
        readOnly: false,
        automaticLayout: true,
        wordWrap: 'on',
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        wrappingStrategy: 'advanced',
        fixedOverflowWidgets: true,
        scrollbar: {
          vertical: 'visible',
          horizontal: 'visible',
          useShadows: true,
          verticalHasArrows: true,
          horizontalHasArrows: true
        }
      }}
    />
  );
};

export default MonacoCodeEditor;