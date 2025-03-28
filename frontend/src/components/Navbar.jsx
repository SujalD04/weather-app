import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-lg px-6 py-3 flex items-center justify-between rounded-b-3xl z-50">
      {/* Left - App Name */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Weather App</h1>

      {/* Center - Navigation Links */}
      <ul className="hidden md:flex space-x-8 text-lg font-medium">
        <NavItem to="/">Home</NavItem>
        <NavItem to="/dashboard">Dashboard</NavItem>
        <NavItem to="/about">About</NavItem>
        <NavItem to="/history">History</NavItem>
        <NavItem to="/signin">Sign In</NavItem> {/* Sign In Link */}
        <NavItem to="/signup">Sign Up</NavItem> {/* Sign Up Link */}
      </ul>

      {/* Right - Theme Toggle & Mobile Menu */}
      <div className="flex items-center space-x-4">
        <ThemeToggle />

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-gray-900 dark:text-white p-2 rounded-md focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {menuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={28} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={28} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            ref={menuRef}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl w-3/4 max-w-xs flex flex-col items-center py-5 space-y-4 md:hidden"
          >
            <NavItem to="/" onClick={() => setMenuOpen(false)}>Home</NavItem>
            <NavItem to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</NavItem>
            <NavItem to="/about" onClick={() => setMenuOpen(false)}>About</NavItem>
            <NavItem to="/history" onClick={() => setMenuOpen(false)}>History</NavItem>
            <NavItem to="/signin" onClick={() => setMenuOpen(false)}>Sign In</NavItem> {/* Sign In Link */}
            <NavItem to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</NavItem> {/* Sign Up Link */}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}

// Reusable NavItem Component
function NavItem({ to, children, onClick }) {
  return (
    <li>
      <Link
        to={to}
        onClick={onClick}
        className="relative px-4 py-2 transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400"
      >
        {children}
        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 hover:w-full"></span>
      </Link>
    </li>
  );
}
