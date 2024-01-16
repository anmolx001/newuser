import React, { useState, useRef, useEffect } from 'react';
import './App.css'; // Import your custom CSS file for styling

interface Chip {
  id: number;
  label: string;
}

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [chips, setChips] = useState<Chip[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>(['Angular', 'jQuery', 'Polymer', 'React', 'Vue.js', 'abs', 'Julie', 'John', 'Test', 'Data', 'List', 'New', 'zjja']);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);

    const filtered = suggestions.filter(item => item.toLowerCase().includes(event.target.value.toLowerCase()));
    setSuggestions(filtered);
  };

  const handleAddChip = (chipLabel: string) => {
    const newChip: Chip = { id: Date.now(), label: chipLabel };
    setChips((prevChips) => [...prevChips, newChip]);
    setSuggestions((prevSuggestions) => prevSuggestions.filter((suggestion) => suggestion !== chipLabel));
    setInputValue('');
    setShowSuggestions(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      handleAddChip(inputValue.trim());
    }
  };

  const handleRemoveChip = (chipId: number) => {
    const removedChip = chips.find((chip) => chip.id === chipId);
    if (removedChip) {
      setChips((prevChips) => prevChips.filter((chip) => chip.id !== chipId));
      setSuggestions((prevSuggestions) => [...prevSuggestions, removedChip.label]);
    }
  };
  const handleClearInput = () => {
    setInputValue('');
    setSuggestions(suggestions); // Reset suggestions to the full list
    setShowSuggestions(true); // Show the suggestions dropdown when input is cleared
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleAddChip(suggestion);
    console.log("Fuckklkkkkk");
    setShowSuggestions(false);
  };

  const handleInputClick = () => {
    setShowSuggestions(true);
  };
  return (
    <div className="app-container">
      <h1 className="heading">Pick Users</h1>
      <div className="dropdown-container">
      <div className="input-container">
  <div className="chips-container">
    {chips.map((chip) => (
      <div key={chip.id} className="custom-chip">
        {chip.label}
        <span className="custom-chip-remove" onClick={() => handleRemoveChip(chip.id)}>
          X
        </span>
      </div>
    ))}
  </div>
  <input
    type="text"
    value={inputValue}
    onChange={handleInputChange}
    onKeyDown={handleKeyDown}
    placeholder="Type here..."
    className="custom-input"
    ref={inputRef}
    onClick={handleInputClick}
  />
</div>
        {showSuggestions && (
          <div className="suggestions">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion}
                className="suggestion"
                onMouseDown={() => handleSuggestionClick(suggestion)} // Use mousedown event
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
};

export default App;
