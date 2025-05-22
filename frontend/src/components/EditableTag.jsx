import React, { useRef, useEffect, useState } from 'react';

const EditableTag = ({
  value,
  onChange,
  placeholder,
  onAddAfter,
  onRemoveSelf,
  autoFocus = false,
}) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  // Sync external value to contentEditable DOM
  useEffect(() => {
    if (divRef.current && divRef.current.innerText !== value) {
      divRef.current.innerText = value;
    }
  }, [value]);

  // Focus if autoFocus is true
  useEffect(() => {
    if (autoFocus && divRef.current) {
      divRef.current.focus();

      // Move cursor to end
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(divRef.current);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }, [autoFocus]);

  const handleInput = () => {
    const newText = divRef.current.innerText;
    onChange(newText);
  };

  const handleKeyDown = (e) => {
    const text = divRef.current.innerText.trim();

    if (e.key === 'Enter') {
      e.preventDefault();
      onChange(text);
      onAddAfter();
    }

    if (e.key === 'Backspace' && text === '') {
      e.preventDefault();
      onRemoveSelf();
    }
  };

  const handleBlur = () => {
    const trimmed = divRef.current.innerText.trim();
    onChange(trimmed);
    setIsFocused(false);
  };

  const isEmpty = !value.trim();

  return (
    <div className="relative">
      {isEmpty && !isFocused && (
        <span className="absolute left-2 top-1 text-gray-400 pointer-events-none select-none text-sm no-print">
          {placeholder}
        </span>
      )}
      <div
        ref={divRef}
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={() => setIsFocused(true)}
        className={`px-2 py-1 inline-block text-sm2 text-gray-800 transition-all
          ${isEmpty ? 'border-transparent' : 'border-b border-gray-300'}
          ${isFocused || !isEmpty ? 'hover:bg-gray-100 focus:bg-gray-100' : ''}
          focus:outline-none`}
        style={{
          minWidth: '2ch',
          whiteSpace: 'pre-wrap',
          lineHeight: '18px',
          fontSize: '15px',
          fontFamily:
            'Inter, Arial, Helvetica, "Noto Sans Devanagari", "Noto Sans CJK SC Thin", "Noto Sans SC", "Noto Sans Hebrew", "Noto Sans Bengali", sans-serif',
        }}
      />
    </div>
  );
};

export default EditableTag;
