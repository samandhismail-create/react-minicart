import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

type StarRatingProps = {
  rating: number;
  maxRating?: number;
};

export const StarRating = ({ rating, maxRating = 5 }: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = maxRating - fullStars - halfStar;

  return (
    <div className="flex items-center gap-1">
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-400 text-xl" />
        ))}
      {halfStar === 1 && <FaStarHalfAlt className="text-yellow-400 text-xl" />}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="text-gray-300 text-xl" />
        ))}
      <span className="ml-2 text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
};
