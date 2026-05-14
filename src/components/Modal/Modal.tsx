import React, { type FC } from 'react'
import { createPortal } from 'react-dom';
import cls from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  image: string;
  title: string;
  buttonText: string;
  onClick: () => void;
}

export const Modal: FC<ModalProps> = ({ isOpen, image, title, buttonText, onClick }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={cls.overlay}>
      <div className={cls.modal}>
        <div className={cls.content}>
          <img src={image} className={cls.image} alt="success" />
          <h2 className={cls.title}>{title}</h2>
          <button className={cls.button} onClick={onClick}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};