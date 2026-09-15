import './Footer.css';
import VkIcon from '../assets/vk.svg?react';
import YoutubeIcon from '../assets/youtube.svg?react';
import OkIcon from '../assets/ok.svg?react';
import TelegramIcon from '../assets/telegram.svg?react'

const Footer = () => (
  <footer className="app-footer">
    <div className='social-link'>
      <a href='#'>
        <VkIcon className='social-icon'/>
      </a>
      <a href='#'>
        <YoutubeIcon className='social-icon'/>
      </a>
      <a href='#'>
        <OkIcon className='social-icon'/>
      </a>
      <a href='#'>
        <TelegramIcon className='social-icon'/>
      </a>
    </div>
  </footer>
);

export default Footer;
