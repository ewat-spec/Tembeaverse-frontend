'use client';
import { useState, useRef, useEffect } from "react";

export default function UserMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Accessibility: close menu on Escape
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setMenuOpen((open) => !open)}
        aria-haspopup="true"
        aria-expanded={menuOpen}
        aria-controls="user-menu-dropdown"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Menu
      </button>
      {menuOpen && (
        <div
          id="user-menu-dropdown"
          className="absolute mt-2 w-48 bg-white shadow-lg rounded z-10"
          role="menu"
          aria-label="User menu"
        >
          <a
            href="/profile"
            className="block px-4 py-2 hover:bg-gray-100"
            role="menuitem"
            tabIndex={0}
          >
            Profile
          </a>
          <a
            href="/trips"
            className="block px-4 py-2 hover:bg-gray-100"
            role="menuitem"
            tabIndex={0}
          >
            Trips
          </a>
          <a
            href="/logout"
            className="block px-4 py-2 hover:bg-gray-100"
            role="menuitem"
            tabIndex={0}
          >
            Logout
          </a>
        </div>
      )}
    </div>
  );
}
