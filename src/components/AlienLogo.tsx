import React from 'react';

interface AlienLogoProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function AlienLogo({ className = '', size = 48, color = 'currentColor' }: AlienLogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Alien Head / Chat Bubble Body */}
      <path 
        d="M50 5C25.1472 5 5 22.9086 5 45C5 58.8254 13.1235 70.9354 25.5 78.4354V95L45.5 83.5C47 83.5 48.5 83.5 50 83.5C74.8528 83.5 95 65.5914 95 43.5C95 21.4086 74.8528 3.5 50 3.5V5Z" 
        fill={color}
      />
      {/* Eyes */}
      <ellipse cx="32" cy="45" rx="8" ry="14" transform="rotate(-15 32 45)" fill="white" fillOpacity="0.9" />
      <ellipse cx="68" cy="45" rx="8" ry="14" transform="rotate(15 68 45)" fill="white" fillOpacity="0.9" />
      {/* Eye Pupils / Highlights */}
      <circle cx="34" cy="40" r="3" fill="white" />
      <circle cx="66" cy="40" r="3" fill="white" />
    </svg>
  );
}
