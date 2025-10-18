import { useRef } from "react";

type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
};

export function SearchBar({value, onChange, onSubmit}: SearchBarProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);


    return (
        <div className="flex gap-2 p-4">
            <input ref={inputRef} className="border-solid" type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder="Enter movie name..." />
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onSubmit}>Search</button>
        </div>
    );
}