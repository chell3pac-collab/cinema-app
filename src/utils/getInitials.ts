export function getInitials(name?: string, surname?: string): string {
  if (!name && !surname) return '?';
  
  const first = name ? name.charAt(0).toUpperCase() : '';
  const last = surname ? surname.charAt(0).toUpperCase() : '';

  if (first && last) return first + last;
  
  if (first) return first;
  
  if (last) return last;

  return '?';
}
