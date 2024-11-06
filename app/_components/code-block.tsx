'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { highlight } from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism-tomorrow.css';
import { useCallback, useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  editable?: boolean;
  onCodeChange?: (code: string) => void;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'typescript',
  showLineNumbers = true,
  editable = false,
  onCodeChange,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableCode, setEditableCode] = useState(code);

  // Syntax highlighting
  const highlightCode = useCallback(
    (codeString: string) => {
      if (!language) return codeString;
      return highlight(codeString, language);
    },
    [language]
  );

  // Copy to clipboard functionality
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(editableCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // Handle code changes
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setEditableCode(newCode);
    onCodeChange?.(newCode);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden bg-[#1e1e1e] font-mono">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-[#404040]">
        <span className="text-sm text-gray-400">{language}</span>
        <div className="flex gap-2">
          {editable && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {isEditing ? 'View' : 'Edit'}
            </button>
          )}
          <button
            onClick={copyToClipboard}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <AnimatePresence>
              {isCopied ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Copied!
                </motion.span>
              ) : (
                'Copy'
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Code Content */}
      <div className="relative">
        {isEditing ? (
          <textarea
            value={editableCode}
            onChange={handleCodeChange}
            className="w-full min-h-[200px] p-4 bg-[#1e1e1e] text-white font-mono resize-y outline-none"
            spellCheck="false"
          />
        ) : (
          <pre className="p-4 m-0 overflow-x-auto">
            {showLineNumbers && (
              <div className="absolute left-0 top-0 p-4 select-none border-r border-[#404040]">
                {editableCode.split('\n').map((_, i) => (
                  <div key={i} className="text-gray-500 pr-4 text-right">
                    {i + 1}
                  </div>
                ))}
              </div>
            )}
            <code
              className={`language-${language}`}
              dangerouslySetInnerHTML={{
                __html: highlightCode(editableCode),
              }}
            />
          </pre>
        )}
      </div>
    </div>
  );
};

// Optional: Enhanced version with template support
interface Template {
  value: string;
  variables: Record<string, string>;
}

interface ModCodeBlockProps extends Omit<CodeBlockProps, 'code'> {
  template: Template;
}

const ModCodeBlock: React.FC<ModCodeBlockProps> = ({ template, ...props }) => {
  const [variables, setVariables] = useState(template.variables);

  const processedCode = template.value.replace(
    /\{\{(\w+)\}\}/g,
    (_, key) => variables[key] || `<${key}>`
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(template.variables).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm text-gray-400 mb-1">{key}</label>
            <input
              type="text"
              value={variables[key]}
              onChange={(e) =>
                setVariables((prev) => ({ ...prev, [key]: e.target.value }))
              }
              className="px-3 py-2 rounded bg-[#2d2d2d] border border-[#404040] text-white"
            />
          </div>
        ))}
      </div>
      <CodeBlock {...props} code={processedCode} />
    </div>
  );
};

export { CodeBlock, ModCodeBlock };
