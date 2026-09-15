export function getRatingClass(rating: number | undefined): string {
  if (rating === undefined || rating === null) return 'rating-unknown';
  if (rating >= 8) return 'rating-high';
  if (rating >= 6) return 'rating-medium';
  return 'rating-low';
}