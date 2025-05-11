import styles from './App.module.css';
import { BarLoader } from 'react-spinners';
import { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import fetchPhotos from '../../photos-api';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import Modal from 'react-modal';

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');

  function openModal(largeURL) {
    setModalImg(largeURL);
    setIsOpen(true);
    Modal.setAppElement('#imageCard');
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSearch = (query) => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }
    async function fetchMorePhotos() {
      try {
        setIsError(false);
        setIsLoading(true);
        const newPhotos = await fetchPhotos(query, page);
        setImages((prevPhotos) => [...prevPhotos, ...newPhotos]);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMorePhotos();
  }, [query, page]);

  return (
    <div className={styles.container}>
      <SearchBar onSearch={handleSearch} />
      {isError && <ErrorMessage />}
      {isLoading && <BarLoader />}
      {images.length > 0 && (
        <ImageGallery
          onOpen={setModalImg}
          openModal={openModal}
          images={images}
        />
      )}
      {images.length > 0 && (
        <ImageModal
          closeModal={closeModal}
          isOpen={modalIsOpen}
          url={modalImg}
        />
      )}
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onLoadMore={handleLoadMore} />
      )}
    </div>
  );
}
