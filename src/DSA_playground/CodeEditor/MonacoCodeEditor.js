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
      automaticLayout: true
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