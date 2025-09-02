"use client";

import { useState, useEffect } from "react";

interface NavigationIndicatorProps {
  currentSection: number;
  totalSections?: number;
  onSectionClick?: (index: number) => void;
}

export default function NavigationIndicator({
  currentSection = 0,
  totalSections = 4,
  onSectionClick,
}: NavigationIndicatorProps) {
  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
      {Array.from({ length: totalSections }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSectionClick?.(index)}
          className={`h-0.5 transition-all duration-500 ease-out ${
            index === currentSection
              ? "bg-gray-900 w-10"
              : "bg-gray-400 w-8 hover:bg-gray-600"
          }`}
          aria-label={`Go to section ${index + 1}`}
        />
      ))}
    </div>
  );
}