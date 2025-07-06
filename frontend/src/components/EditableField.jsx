import React, { useRef, useEffect, useState } from 'react';

export default function EditableField({
  value,
  onChange,
  placeholder,
  className,
  bulleted = false,
}) {
  const ref = useRef(null);
  const [isEmpty, setIsEmpty] = useState(!value?.trim());

  useEffect(() => {
    if (ref.current) {
      let displayValue = value || '';
      if (bulleted && displayValue && !displayValue.startsWith('•')) {
        displayValue = `• ${displayValue}`;
      }
      ref.current.innerText = displayValue;
      setIsEmpty(!displayValue.trim());
    }
  }, [value, bulleted]);

  const handleBlur = () => {
    if (ref.current) {
      const newValue = ref.current.innerText.trim();
      setIsEmpty(!newValue);
      if (newValue !== value) {
        onChange(newValue);
      }
    }
  };

  const handleInput = () => {
    if (!ref.current) return;
  
    let text = ref.current.innerText;
    const trimmedText = text.trim();
  
    // Check if field is "empty" or just has bullet
    const isTrulyEmpty = !trimmedText || trimmedText === '•';
  
    setIsEmpty(isTrulyEmpty);
  
    if (bulleted) {
      if (isTrulyEmpty) {
        // If just bullet or empty, clear field
        ref.current.innerText = '';
        return;
      }
  
      if (!text.startsWith('•')) {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const cursorPosition = range.startOffset;
  
        // Prepend bullet and adjust cursor
        ref.current.innerText = `• ${text}`;
        range.setStart(ref.current.firstChild, cursorPosition + 2);
        range.setEnd(ref.current.firstChild, cursorPosition + 2);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };
  

  const handleKeyDown = (e) => {
    if (bulleted && e.key === 'Enter') {
      e.preventDefault();

      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const bulletNode = document.createTextNode('\n• ');
      range.insertNode(bulletNode);

      // Move cursor after bullet
      range.setStartAfter(bulletNode);
      range.setEndAfter(bulletNode);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  return (
    <div className="relative">
      {isEmpty && (
        <span className="absolute left-2 top-1 text-gray-400 pointer-events-none select-none text-sm no-print">
          {placeholder}
        </span>
      )}
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        onInput={handleInput}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`bg-white transition-colors duration-200 hover:text-gray-500 focus:text-gray-500 hover:border hover:shadow-md hover:border-blue-500 focus:border focus:border-gray-300 focus:outline-none px-2 min-w-[100px] whitespace-pre-wrap ${className}`}
      />
    </div>
  );
}
