import React from 'react';
import { useRouter } from 'next/navigation';
import './OfferPage.css';

const OfferPage = () => {
  const router = useRouter();
  const { offerId } = router.query;

  const handleLike = () => {
    // Handle like logic
  };

  const handleDislike = () => {
    // Handle dislike logic
  };

  const handleComment = () => {
    // Handle comment logic
  };

  // Dummy offer data (replace with your actual offer data)
  const offer = {
    id: offerId,
    coverPhoto: 'https://example.com/offer1.jpg',
    title: '50% Off Summer Sale',
    brand: 'ABC Company',
    startDate: '2023-06-01',
    endDate: '2023-06-15',
    likes: 100,
    dislikes: 10,
    comments: 20,
  };

  return (
    <div className={styles.offerPage}>
      <img src={offer.coverPhoto} alt={offer.title} className={styles.offerImage} />
      <h1 className={styles.offerTitle}>{offer.title}</h1>
      <p className={styles.offerBrand}>Brand: {offer.brand}</p>
      <p className={styles.offerDate}>Start Date: {offer.startDate}</p>
      <p className={styles.offerDate}>End Date: {offer.endDate}</p>
      <div className={styles.offerActions}>
        <button onClick={handleLike} className={styles.offerButton}>Like</button>
        <button onClick={handleDislike} className={styles.offerButton}>Dislike</button>
        <button onClick={handleComment} className={styles.offerButton}>Comment</button>
      </div>
      <p className={styles.offerStats}>Likes: {offer.likes}</p>
      <p className={styles.offerStats}>Dislikes: {offer.dislikes}</p>
      <p className={styles.offerStats}>Comments: {offer.comments}</p>
    </div>
  );
};

export default OfferPage;
