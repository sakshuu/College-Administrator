import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Search' }) {
  return (
    <div className="input-group mb-3 shadow-sm">
      <span className="input-group-text bg-white border-end-0 text-muted">
        <Search size={18} />
      </span>
      <input
        type="text"
        className="form-control border-start-0 py-2"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
