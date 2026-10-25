import styles from "./Search.module.css";

interface SearchBarProps {
  placeholder?: string;
  onSearchChange?: (value: string) => void;
}

export function Search({
  placeholder = "Search...",
  onSearchChange,
}: Readonly<SearchBarProps>) {
  return (
    <div className={styles.search__bar}>
      <span className={styles.search__icon}>
        &#128269;
      </span>
      <input
        type="search"
        placeholder={placeholder}
        onChange={(event) => onSearchChange?.(event.target.value)}
      />
    </div>
  );
}
