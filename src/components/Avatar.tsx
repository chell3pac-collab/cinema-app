import React from 'react';
import { getInitials } from '../utils/getInitials';
import './Avatar.css'; 

interface AvatarProps {
  name?: string | undefined;
  size?: number; // 
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ name, size = 48, className }) => {
  const initials = getInitials(name);
  
  return (
    <div 
      className={`avatar-circle ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.5 }} 
      aria-label={name ? `${name}'s avatar` : 'Avatar'}
      title={name || 'Гость'}
    >
      {initials}
    </div>
  );
};